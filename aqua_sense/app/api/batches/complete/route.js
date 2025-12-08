import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      sensorData,
      predictions,
      primary,
      secondary,
      tertiary,
      intendedUse,
      userId
    } = data;

    // ==============================================================  
    // 1️⃣ CREATE BATCH  
    // ==============================================================  
    const final_result = "SUITABLE";  // Must match your DB constraint

    const batchInsert = await pool.query(
      `INSERT INTO batches 
        (initial_ph, initial_turbidity, initial_tds, initial_do,
         initial_temperature, initial_conductivity, flow_rate,
         intended_reuse, ai_predicted_reuse, final_result, user_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
       RETURNING batch_id`,
      [
        sensorData.pH,
        sensorData.turbidity,
        sensorData.TDS,
        sensorData.DO,
        sensorData.temperature,
        tertiary.conductivity,
        sensorData.flowRate,
        intendedUse.name,
        predictions[0].name,
        final_result,
        userId || null
      ]
    );

    const batch_id = batchInsert.rows[0].batch_id;

    // ==============================================================  
    // 2️⃣ PRIMARY STAGE  
    // ==============================================================  
    await pool.query(
      `INSERT INTO primary_stage_readings
        (batch_id, flow, level, turbidity, pressure, temperature, timestamp, raw_json)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [
        batch_id,
        primary.flow,
        primary.level,
        primary.turbidity,
        primary.pressure,
        primary.temperature,
        primary.timestamp,
        primary
      ]
    );

    // ==============================================================  
    // 3️⃣ SECONDARY STAGE  
    // ==============================================================  
    await pool.query(
      `INSERT INTO secondary_stage_readings
        (batch_id, "do", ph, orp, tss_mlss, ammonia, sludge_level, secondary_flow, timestamp, raw_json)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
      [
        batch_id,
        secondary.do,
        secondary.ph,
        secondary.orp,
        secondary.tss_mlss,
        secondary.ammonia,
        secondary.sludge_level,
        secondary.secondary_flow,
        secondary.timestamp,
        secondary
      ]
    );

    // ==============================================================  
    // 4️⃣ TERTIARY STAGE  
    // ==============================================================  
    await pool.query(
      `INSERT INTO tertiary_stage_readings
        (batch_id, conductivity, tds, nitrate, residual_chlorine,
         turbidity_final, differential_pressure, salinity, oil_in_water, uvt, timestamp, raw_json)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)`,
      [
        batch_id,
        tertiary.conductivity,
        tertiary.tds,
        tertiary.nitrate,
        tertiary.residual_chlorine,
        tertiary.turbidity_final,
        tertiary.differential_pressure,
        tertiary.salinity,
        tertiary.oil_in_water,
        tertiary.uvt,
        tertiary.timestamp,
        tertiary
      ]
    );

    // ==============================================================  
    // 🎉 DONE  
    // ==============================================================  
    return NextResponse.json({
      success: true,
      batch_id
    });

  } catch (err) {
    console.error("ERROR inserting full batch:", err);
    return NextResponse.json({ error: "Failed to insert full batch" }, { status: 500 });
  }
}
