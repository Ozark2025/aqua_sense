// 'use client';

// import { useState } from 'react';
// import AdminSidebar from '@/components/admin/AdminSidebar';
// import GlassCard from '@/components/admin/GlassCard';
// import DataTable from '@/components/admin/DataTable';
// import WaveDivider from '@/components/admin/WaveDivider';
// import { X, TrendingUp, Clock, Droplet, GitBranch, Bot, CheckCircle, Download } from 'lucide-react';

// export default function BatchHistoryPage() {
//   const [selectedBatch, setSelectedBatch] = useState(null);

//   const batches = [
//     {
//       id: 'BTH-15234',
//       timestamp: '2024-12-06 14:32:45',
//       qualitySummary: 'Good',
//       mlPrediction: 'Reuse - 94% confidence',
//       finalRouting: 'Irrigation',
//       operatorApproval: 'Approved',
//       aiComments: 'Water quality exceeds irrigation standards. pH balanced, TDS within limits.'
//     },
//     {
//       id: 'BTH-15233',
//       timestamp: '2024-12-06 14:15:20',
//       qualitySummary: 'Excellent',
//       mlPrediction: 'Reuse - 98% confidence',
//       finalRouting: 'Cooling System',
//       operatorApproval: 'Approved',
//       aiComments: 'Optimal parameters for cooling tower. Low turbidity detected.'
//     },
//     {
//       id: 'BTH-15232',
//       timestamp: '2024-12-06 13:48:10',
//       qualitySummary: 'Fair',
//       mlPrediction: 'Discharge - 76% confidence',
//       finalRouting: 'Discharge',
//       operatorApproval: 'Approved',
//       aiComments: 'High TDS levels. Recommended for safe discharge after treatment.'
//     },
//     {
//       id: 'BTH-15231',
//       timestamp: '2024-12-06 13:20:55',
//       qualitySummary: 'Good',
//       mlPrediction: 'Reuse - 91% confidence',
//       finalRouting: 'Reuse',
//       operatorApproval: 'Approved',
//       aiComments: 'Suitable for non-potable reuse applications.'
//     }
//   ];

//   const columns = [
//     { header: 'Batch ID', key: 'id', render: (val) => <span className="font-display font-bold text-shakespeare-600">{val}</span> },
//     { header: 'Timestamp', key: 'timestamp' },
//     { 
//       header: 'Quality', 
//       key: 'qualitySummary',
//       render: (val) => (
//         <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
//           val === 'Excellent' ? 'bg-green-500/20 text-green-700' :
//           val === 'Good' ? 'bg-shakespeare-500/20 text-shakespeare-700' :
//           'bg-orange-accent/20 text-orange-accent'
//         }`}>
//           {val}
//         </span>
//       )
//     },
//     { header: 'ML Prediction', key: 'mlPrediction' },
//     { 
//       header: 'Final Routing', 
//       key: 'finalRouting',
//       render: (val) => (
//         <span className="px-3 py-1 rounded-full bg-shakespeare-500 text-white text-xs font-bold">
//           {val}
//         </span>
//       )
//     },
//     { 
//       header: 'Status', 
//       key: 'operatorApproval',
//       render: (val) => (
//         <span className="flex items-center gap-1 text-green-600">
//           <CheckCircle className="w-4 h-4" />
//           <span className="text-xs font-semibold">{val}</span>
//         </span>
//       )
//     }
//   ];

//   const handleExportToExcel = () => {
//     // Create CSV content
//     const headers = ['Batch ID', 'Timestamp', 'Quality Summary', 'ML Prediction', 'Final Routing', 'Operator Approval', 'AI Comments'];
//     const csvContent = [
//       headers.join(','),
//       ...batches.map(batch => [
//         batch.id,
//         batch.timestamp,
//         batch.qualitySummary,
//         `"${batch.mlPrediction}"`,
//         batch.finalRouting,
//         batch.operatorApproval,
//         `"${batch.aiComments}"`
//       ].join(','))
//     ].join('\n');

//     // Create blob and download
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//     const link = document.createElement('a');
//     const url = URL.createObjectURL(blob);
//     link.setAttribute('href', url);
//     link.setAttribute('download', `batch_history_${new Date().toISOString().split('T')[0]}.csv`);
//     link.style.visibility = 'hidden';
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-shakespeare-50 via-shakespeare-100 to-aqua-teal/20">
//       <div className="fixed left-0 top-0 h-screen w-64 bg-white/20 backdrop-blur-xl border-r border-white/20">
        
//          <AdminSidebar />
//       </div>

//       <main className="flex-1 overflow-y-auto ml-72">
//         {/* Header */}
//         <div className=" bg-gradient-to-r from-shakespeare-500 via-shakespeare-600 to-royal-blue overflow-hidden fixed w-full z-50">
//           <div className="absolute inset-0 opacity-20">
//             <div className="absolute top-0 left-0 w-full h-full animate-wave bg-gradient-to-br from-white/20 to-transparent" />
//           </div>
//           <div className="relative z-10 p-8">
//             <h1 className="font-display text-4xl font-bold text-white mb-2">
//               Batch History
//             </h1>
//             <p className="text-shakespeare-100 text-lg">
//               Complete water batch processing records
//             </p>
//           </div>
//           <WaveDivider className="absolute -bottom-1" />
//         </div>

//         {/* Content */}
//         <div className="p-8 mt-30">
//           <GlassCard className="overflow-hidden">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-6">
//                 <h2 className="font-display text-xl font-bold text-shakespeare-950">
//                   Recent Batches
//                 </h2>
//                 <button
//                   onClick={handleExportToExcel}
//                   className="px-6 py-3 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-lg hover:shadow-shakespeare-500/30 transition-all duration-300 flex items-center gap-2"
//                 >
//                   <Download className="w-4 h-4" />
//                   Export to Excel
//                 </button>
//               </div>
//               <DataTable 
//                 columns={columns} 
//                 data={batches}
//                 onRowClick={setSelectedBatch}
//               />
//             </div>
//           </GlassCard>
//         </div>

//         {/* Detail Drawer */}
//         {selectedBatch && (
//           <div className="fixed inset-0 bg-shakespeare-950/50 backdrop-blur-sm z-50 flex items-center justify-end">
//             <div className="w-full max-w-2xl h-full bg-gradient-to-br from-shakespeare-50 to-shakespeare-100 shadow-2xl overflow-y-auto animate-in slide-in-from-right">
//               <div className="p-8">
//                 {/* Header */}
//                 <div className="flex items-center justify-between mb-8">
//                   <div>
//                     <h2 className="font-display text-3xl font-bold text-shakespeare-950 mb-2">
//                       {selectedBatch.id}
//                     </h2>
//                     <p className="text-shakespeare-700 flex items-center gap-2">
//                       <Clock className="w-4 h-4" />
//                       {selectedBatch.timestamp}
//                     </p>
//                   </div>
//                   <button
//                     onClick={() => setSelectedBatch(null)}
//                     className="w-10 h-10 rounded-full bg-shakespeare-200/50 hover:bg-shakespeare-300/50 flex items-center justify-center transition-all duration-300"
//                   >
//                     <X className="w-5 h-5 text-shakespeare-950" />
//                   </button>
//                 </div>

//                 <WaveDivider />

//                 {/* Water Parameters Graph */}
//                 <GlassCard className="p-6 mb-6">
//                   <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
//                     <Droplet className="w-5 h-5" />
//                     Water Parameters
//                   </h3>
//                   <div className="space-y-4">
//                     {[
//                       { label: 'pH Level', value: 7.2, max: 14, color: 'bg-shakespeare-500' },
//                       { label: 'TDS (ppm)', value: 340, max: 500, color: 'bg-aqua-teal' },
//                       { label: 'Turbidity (NTU)', value: 2.5, max: 10, color: 'bg-royal-blue' },
//                       { label: 'Flow Rate (L/min)', value: 150, max: 200, color: 'bg-shakespeare-600' }
//                     ].map((param, idx) => (
//                       <div key={idx}>
//                         <div className="flex justify-between text-sm mb-1">
//                           <span className="text-shakespeare-800 font-medium">{param.label}</span>
//                           <span className="font-display font-bold text-shakespeare-950">{param.value}</span>
//                         </div>
//                         <div className="h-3 bg-shakespeare-200/30 rounded-full overflow-hidden">
//                           <div 
//                             className={`h-full ${param.color} rounded-full transition-all duration-1000`}
//                             style={{ width: `${(param.value / param.max) * 100}%` }}
//                           />
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </GlassCard>

//                 {/* Timeline of Decisions */}
//                 <GlassCard className="p-6 mb-6">
//                   <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
//                     <TrendingUp className="w-5 h-5" />
//                     Decision Timeline
//                   </h3>
//                   <div className="space-y-4">
//                     {[
//                       { time: '14:32:45', event: 'Batch initiated', status: 'completed' },
//                       { time: '14:32:52', event: 'Sensor data collected', status: 'completed' },
//                       { time: '14:33:01', event: 'ML analysis completed', status: 'completed' },
//                       { time: '14:33:15', event: 'AI recommendation generated', status: 'completed' },
//                       { time: '14:33:45', event: 'Operator approval received', status: 'completed' },
//                       { time: '14:34:00', event: 'Routing to irrigation system', status: 'active' }
//                     ].map((step, idx) => (
//                       <div key={idx} className="flex items-center gap-4">
//                         <div className={`w-3 h-3 rounded-full ${
//                           step.status === 'completed' ? 'bg-green-500' : 'bg-shakespeare-500 animate-pulse'
//                         }`} />
//                         <div className="flex-1">
//                           <p className="text-sm text-shakespeare-900 font-medium">{step.event}</p>
//                           <p className="text-xs text-shakespeare-700">{step.time}</p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </GlassCard>

//                 {/* AI Agent Q&A */}
//                 <GlassCard className="p-6 mb-6">
//                   <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
//                     <Bot className="w-5 h-5" />
//                     AI Agent Analysis
//                   </h3>
//                   <div className="space-y-3">
//                     <div className="p-4 rounded-2xl bg-shakespeare-500/10 border border-shakespeare-400/30">
//                       <p className="text-xs text-shakespeare-700 font-semibold mb-1">ML Prediction</p>
//                       <p className="text-sm text-shakespeare-950">{selectedBatch.mlPrediction}</p>
//                     </div>
//                     <div className="p-4 rounded-2xl bg-royal-blue/10 border border-royal-blue/30">
//                       <p className="text-xs text-shakespeare-700 font-semibold mb-1">Agent Comments</p>
//                       <p className="text-sm text-shakespeare-950">{selectedBatch.aiComments}</p>
//                     </div>
//                   </div>
//                 </GlassCard>

//                 {/* Valve Routing Animation */}
//                 <GlassCard className="p-6">
//                   <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
//                     <GitBranch className="w-5 h-5" />
//                     Valve Routing
//                   </h3>
//                   <div className="flex items-center justify-center h-48 relative">
//                     <div className="absolute left-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center animate-pulse">
//                       <Droplet className="w-8 h-8 text-white" />
//                     </div>
//                     <div className="absolute left-20 top-1/2 w-32 h-1 bg-gradient-to-r from-shakespeare-500 to-transparent animate-wave" />
//                     <div className="absolute right-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
//                       <span className="text-white font-bold text-xs text-center">{selectedBatch.finalRouting}</span>
//                     </div>
//                   </div>
//                 </GlassCard>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import GlassCard from '@/components/admin/GlassCard';
import DataTable from '@/components/admin/DataTable';
import WaveDivider from '@/components/admin/WaveDivider';
import { X, TrendingUp, Clock, Droplet, GitBranch, Bot, CheckCircle, Download } from 'lucide-react';

export default function BatchHistoryPage() {
  const [selectedBatch, setSelectedBatch] = useState(null);

  const batches = [
    {
      id: 'BTH-15234',
      batch_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
      timestamp: '2024-12-06 14:32:45',
      window: 'Window-A',
      flow: 150.5,
      level: 2.8,
      turbidity_primary: 45.2,
      pressure: 2.3,
      temperature: 24.5,
      do: 6.8,
      ph: 7.2,
      orp: 245,
      tss_mlss: 3200,
      ammonia: 12.5,
      sludge_level: 1.8,
      secondary_flow: 145.2,
      conductivity: 850,
      tds: 340,
      nitrate: 8.2,
      residual_chlorine: 0.5,
      turbidity_final: 2.5,
      differential_pressure: 0.8,
      salinity: 0.4,
      oil_in_water: 0.02,
      uvt: 92,
      qualitySummary: 'Good',
      mlPrediction: 'Reuse - 94% confidence',
      finalRouting: 'Irrigation',
      operatorApproval: 'Approved',
      aiComments: 'Water quality exceeds irrigation standards. Turbidity reduced by 94.5%. pH balanced, TDS within limits.'
    },
    {
      id: 'BTH-15233',
      batch_id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
      timestamp: '2024-12-06 14:15:20',
      window: 'Window-B',
      flow: 158.3,
      level: 3.1,
      turbidity_primary: 38.7,
      pressure: 2.5,
      temperature: 23.8,
      do: 7.5,
      ph: 7.4,
      orp: 268,
      tss_mlss: 3400,
      ammonia: 9.8,
      sludge_level: 1.6,
      secondary_flow: 155.1,
      conductivity: 720,
      tds: 290,
      nitrate: 6.5,
      residual_chlorine: 0.6,
      turbidity_final: 1.8,
      differential_pressure: 0.6,
      salinity: 0.3,
      oil_in_water: 0.01,
      uvt: 95,
      qualitySummary: 'Excellent',
      mlPrediction: 'Reuse - 98% confidence',
      finalRouting: 'Cooling System',
      operatorApproval: 'Approved',
      aiComments: 'Optimal parameters for cooling tower. Turbidity reduced by 95.3%. Low turbidity detected, excellent DO levels.'
    },
    {
      id: 'BTH-15232',
      batch_id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
      timestamp: '2024-12-06 13:48:10',
      window: 'Window-A',
      flow: 142.8,
      level: 2.5,
      turbidity_primary: 52.3,
      pressure: 2.1,
      temperature: 25.2,
      do: 5.2,
      ph: 6.8,
      orp: 198,
      tss_mlss: 2800,
      ammonia: 18.2,
      sludge_level: 2.2,
      secondary_flow: 138.5,
      conductivity: 1450,
      tds: 580,
      nitrate: 15.3,
      residual_chlorine: 0.3,
      turbidity_final: 4.2,
      differential_pressure: 1.2,
      salinity: 0.7,
      oil_in_water: 0.05,
      uvt: 85,
      qualitySummary: 'Fair',
      mlPrediction: 'Discharge - 76% confidence',
      finalRouting: 'Discharge',
      operatorApproval: 'Approved',
      aiComments: 'High TDS and conductivity levels. Turbidity reduced by 92.0%. Recommended for safe discharge after treatment.'
    },
    {
      id: 'BTH-15231',
      batch_id: 'd4e5f6a7-b8c9-0123-def1-234567890123',
      timestamp: '2024-12-06 13:20:55',
      window: 'Window-B',
      flow: 152.1,
      level: 2.9,
      turbidity_primary: 41.5,
      pressure: 2.4,
      temperature: 24.1,
      do: 6.5,
      ph: 7.1,
      orp: 235,
      tss_mlss: 3100,
      ammonia: 11.2,
      sludge_level: 1.7,
      secondary_flow: 148.3,
      conductivity: 920,
      tds: 368,
      nitrate: 9.1,
      residual_chlorine: 0.5,
      turbidity_final: 3.1,
      differential_pressure: 0.9,
      salinity: 0.5,
      oil_in_water: 0.03,
      uvt: 90,
      qualitySummary: 'Good',
      mlPrediction: 'Reuse - 91% confidence',
      finalRouting: 'Reuse',
      operatorApproval: 'Approved',
      aiComments: 'Suitable for non-potable reuse applications. Turbidity reduced by 92.5%. Good ammonia removal efficiency.'
    }
  ];

  const columns = [
    { header: 'Batch ID', key: 'id', render: (val) => <span className="font-display font-bold text-shakespeare-600">{val}</span> },
    { header: 'Timestamp', key: 'timestamp' },
    { header: 'Window', key: 'window', render: (val) => <span className="text-xs font-semibold text-shakespeare-700">{val}</span> },
    { 
      header: 'Quality', 
      key: 'qualitySummary',
      render: (val) => (
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          val === 'Excellent' ? 'bg-green-500/20 text-green-700' :
          val === 'Good' ? 'bg-shakespeare-500/20 text-shakespeare-700' :
          'bg-orange-accent/20 text-orange-accent'
        }`}>
          {val}
        </span>
      )
    },
    { 
      header: 'Turbidity ↓', 
      key: 'turbidity_reduction',
      render: (_, row) => {
        const reduction = ((row.turbidity_primary - row.turbidity_final) / row.turbidity_primary * 100).toFixed(1);
        return <span className="text-xs font-bold text-green-600">{reduction}%</span>;
      }
    },
    { 
      header: 'Final Routing', 
      key: 'finalRouting',
      render: (val) => (
        <span className="px-3 py-1 rounded-full bg-shakespeare-500 text-white text-xs font-bold">
          {val}
        </span>
      )
    },
    { 
      header: 'Status', 
      key: 'operatorApproval',
      render: (val) => (
        <span className="flex items-center gap-1 text-green-600">
          <CheckCircle className="w-4 h-4" />
          <span className="text-xs font-semibold">{val}</span>
        </span>
      )
    }
  ];

  const handleExportToExcel = () => {
    const headers = [
      'Batch ID', 'Batch UUID', 'Timestamp', 'Window', 
      'Flow (L/min)', 'Level (m)', 'Primary Turbidity (NTU)', 'Pressure (bar)', 'Temperature (°C)',
      'DO (mg/L)', 'pH', 'ORP (mV)', 'TSS/MLSS (mg/L)', 'Ammonia (mg/L)', 'Sludge Level (m)', 'Secondary Flow (L/min)',
      'Conductivity (µS/cm)', 'TDS (ppm)', 'Nitrate (mg/L)', 'Residual Chlorine (mg/L)', 
      'Final Turbidity (NTU)', 'Differential Pressure (bar)', 'Salinity (ppt)', 'Oil in Water (mg/L)', 'UVT (%)',
      'Quality Summary', 'ML Prediction', 'Final Routing', 'Operator Approval', 'AI Comments'
    ];
    
    const csvContent = [
      headers.join(','),
      ...batches.map(b => [
        b.id, b.batch_id, b.timestamp, b.window,
        b.flow, b.level, b.turbidity_primary, b.pressure, b.temperature,
        b.do, b.ph, b.orp, b.tss_mlss, b.ammonia, b.sludge_level, b.secondary_flow,
        b.conductivity, b.tds, b.nitrate, b.residual_chlorine,
        b.turbidity_final, b.differential_pressure, b.salinity, b.oil_in_water, b.uvt,
        b.qualitySummary, `"${b.mlPrediction}"`, b.finalRouting, b.operatorApproval, `"${b.aiComments}"`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `batch_history_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-shakespeare-50 via-shakespeare-100 to-aqua-teal/20">
      <div className="fixed left-0 top-0 h-screen w-64 bg-white/20 backdrop-blur-xl border-r border-white/20">
        <AdminSidebar />
      </div>

      <main className="flex-1 overflow-y-auto ml-72">
        <div className="bg-gradient-to-r from-shakespeare-500 via-shakespeare-600 to-royal-blue overflow-hidden fixed w-full z-50">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full animate-wave bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="relative z-10 p-8">
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Batch History
            </h1>
            <p className="text-shakespeare-100 text-lg">
              Multi-stage water treatment monitoring & analytics
            </p>
          </div>
          <WaveDivider className="absolute -bottom-1" />
        </div>

        <div className="p-8 mt-30">
          <GlassCard className="overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-shakespeare-950">
                  Recent Batches
                </h2>
                <button
                  onClick={handleExportToExcel}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold hover:shadow-lg hover:shadow-shakespeare-500/30 transition-all duration-300 flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Complete Data
                </button>
              </div>
              <DataTable 
                columns={columns} 
                data={batches}
                onRowClick={setSelectedBatch}
              />
            </div>
          </GlassCard>
        </div>

        {selectedBatch && (
          <div className="fixed inset-0 bg-shakespeare-950/50 backdrop-blur-sm z-50 flex items-center justify-end">
            <div className="w-full max-w-2xl h-full bg-gradient-to-br from-shakespeare-50 to-shakespeare-100 shadow-2xl overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-shakespeare-950 mb-2">
                      {selectedBatch.id}
                    </h2>
                    <p className="text-shakespeare-700 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {selectedBatch.timestamp}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedBatch(null)}
                    className="w-10 h-10 rounded-full bg-shakespeare-200/50 hover:bg-shakespeare-300/50 flex items-center justify-center transition-all duration-300"
                  >
                    <X className="w-5 h-5 text-shakespeare-950" />
                  </button>
                </div>

                <WaveDivider />

                <GlassCard className="p-6 mb-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <Droplet className="w-5 h-5" />
                    Primary Treatment Stage
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Flow Rate', value: selectedBatch.flow, max: 200, color: 'bg-shakespeare-500', unit: 'L/min' },
                      { label: 'Water Level', value: selectedBatch.level, max: 5, color: 'bg-aqua-teal', unit: 'm' },
                      { label: 'Turbidity', value: selectedBatch.turbidity_primary, max: 100, color: 'bg-orange-accent', unit: 'NTU' },
                      { label: 'Pressure', value: selectedBatch.pressure, max: 5, color: 'bg-royal-blue', unit: 'bar' },
                      { label: 'Temperature', value: selectedBatch.temperature, max: 40, color: 'bg-shakespeare-600', unit: '°C' }
                    ].map((p, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-shakespeare-800 font-medium">{p.label}</span>
                          <span className="font-display font-bold text-shakespeare-950">{p.value} {p.unit}</span>
                        </div>
                        <div className="h-3 bg-shakespeare-200/30 rounded-full overflow-hidden">
                          <div className={`h-full ${p.color} rounded-full transition-all duration-1000`} style={{ width: `${(p.value / p.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6 mb-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    Secondary Treatment (Biological)
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Dissolved Oxygen', value: selectedBatch.do, max: 10, color: 'bg-green-500', unit: 'mg/L' },
                      { label: 'pH Level', value: selectedBatch.ph, max: 14, color: 'bg-shakespeare-500', unit: '' },
                      { label: 'ORP', value: selectedBatch.orp, max: 500, color: 'bg-purple-500', unit: 'mV' },
                      { label: 'TSS/MLSS', value: selectedBatch.tss_mlss, max: 5000, color: 'bg-yellow-600', unit: 'mg/L' },
                      { label: 'Ammonia', value: selectedBatch.ammonia, max: 50, color: 'bg-red-500', unit: 'mg/L' },
                      { label: 'Sludge Level', value: selectedBatch.sludge_level, max: 3, color: 'bg-gray-600', unit: 'm' },
                      { label: 'Flow', value: selectedBatch.secondary_flow, max: 200, color: 'bg-aqua-teal', unit: 'L/min' }
                    ].map((p, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-shakespeare-800 font-medium">{p.label}</span>
                          <span className="font-display font-bold text-shakespeare-950">{p.value} {p.unit}</span>
                        </div>
                        <div className="h-3 bg-shakespeare-200/30 rounded-full overflow-hidden">
                          <div className={`h-full ${p.color} rounded-full transition-all duration-1000`} style={{ width: `${(p.value / p.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6 mb-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Tertiary Treatment (Final Polish)
                  </h3>
                  <div className="space-y-4">
                    {[
                      { label: 'Conductivity', value: selectedBatch.conductivity, max: 2000, color: 'bg-shakespeare-500', unit: 'µS/cm' },
                      { label: 'TDS', value: selectedBatch.tds, max: 1000, color: 'bg-aqua-teal', unit: 'ppm' },
                      { label: 'Nitrate', value: selectedBatch.nitrate, max: 50, color: 'bg-blue-500', unit: 'mg/L' },
                      { label: 'Residual Chlorine', value: selectedBatch.residual_chlorine, max: 2, color: 'bg-green-600', unit: 'mg/L' },
                      { label: 'Final Turbidity', value: selectedBatch.turbidity_final, max: 10, color: 'bg-royal-blue', unit: 'NTU' },
                      { label: 'Differential Pressure', value: selectedBatch.differential_pressure, max: 2, color: 'bg-orange-500', unit: 'bar' },
                      { label: 'Salinity', value: selectedBatch.salinity, max: 2, color: 'bg-cyan-500', unit: 'ppt' },
                      { label: 'Oil in Water', value: selectedBatch.oil_in_water, max: 0.1, color: 'bg-amber-600', unit: 'mg/L' },
                      { label: 'UVT', value: selectedBatch.uvt, max: 100, color: 'bg-violet-500', unit: '%' }
                    ].map((p, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-shakespeare-800 font-medium">{p.label}</span>
                          <span className="font-display font-bold text-shakespeare-950">{p.value} {p.unit}</span>
                        </div>
                        <div className="h-3 bg-shakespeare-200/30 rounded-full overflow-hidden">
                          <div className={`h-full ${p.color} rounded-full transition-all duration-1000`} style={{ width: `${(p.value / p.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6 mb-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Treatment Efficiency
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30">
                      <p className="text-xs text-shakespeare-700 font-semibold mb-1">Turbidity Reduction</p>
                      <p className="text-2xl font-display font-bold text-green-600">
                        {((selectedBatch.turbidity_primary - selectedBatch.turbidity_final) / selectedBatch.turbidity_primary * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-shakespeare-600 mt-1">
                        {selectedBatch.turbidity_primary} → {selectedBatch.turbidity_final} NTU
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/30">
                      <p className="text-xs text-shakespeare-700 font-semibold mb-1">Flow Consistency</p>
                      <p className="text-2xl font-display font-bold text-blue-600">
                        {((selectedBatch.secondary_flow / selectedBatch.flow) * 100).toFixed(1)}%
                      </p>
                      <p className="text-xs text-shakespeare-600 mt-1">
                        {selectedBatch.flow} → {selectedBatch.secondary_flow} L/min
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30">
                      <p className="text-xs text-shakespeare-700 font-semibold mb-1">Water Quality Score</p>
                      <p className="text-2xl font-display font-bold text-purple-600">
                        {selectedBatch.qualitySummary === 'Excellent' ? '95' : selectedBatch.qualitySummary === 'Good' ? '85' : '72'}/100
                      </p>
                      <p className="text-xs text-shakespeare-600 mt-1">Based on all parameters</p>
                    </div>
                    <div className="p-4 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/10 border border-orange-500/30">
                      <p className="text-xs text-shakespeare-700 font-semibold mb-1">Processing Window</p>
                      <p className="text-2xl font-display font-bold text-orange-600">
                        {selectedBatch.window}
                      </p>
                      <p className="text-xs text-shakespeare-600 mt-1">Treatment zone</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6 mb-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    AI Agent Analysis
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-2xl bg-shakespeare-500/10 border border-shakespeare-400/30">
                      <p className="text-xs text-shakespeare-700 font-semibold mb-1">ML Prediction</p>
                      <p className="text-sm text-shakespeare-950">{selectedBatch.mlPrediction}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-royal-blue/10 border border-royal-blue/30">
                      <p className="text-xs text-shakespeare-700 font-semibold mb-1">Comments</p>
                      <p className="text-sm text-shakespeare-950">{selectedBatch.aiComments}</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-4 flex items-center gap-2">
                    <GitBranch className="w-5 h-5" />
                    Multi-Stage Treatment Flow
                  </h3>
                  <div className="flex items-center justify-between relative py-8">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-shakespeare-400 to-shakespeare-600 flex items-center justify-center animate-pulse shadow-lg">
                        <Droplet className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-xs font-bold text-shakespeare-950 mt-2">Primary</p>
                      <p className="text-xs text-shakespeare-700">{selectedBatch.turbidity_primary} NTU</p>
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-shakespeare-500 to-green-500 animate-pulse mx-2" />
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                        <Bot className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-xs font-bold text-shakespeare-950 mt-2">Secondary</p>
                      <p className="text-xs text-shakespeare-700">DO: {selectedBatch.do}</p>
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-green-500 to-blue-500 animate-pulse mx-2" />
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-lg">
                        <CheckCircle className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-xs font-bold text-shakespeare-950 mt-2">Tertiary</p>
                      <p className="text-xs text-shakespeare-700">{selectedBatch.turbidity_final} NTU</p>
                    </div>
                    <div className="flex-1 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 animate-pulse mx-2" />
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center shadow-lg">
                        <TrendingUp className="w-10 h-10 text-white" />
                      </div>
                      <p className="text-xs font-bold text-emerald-950 mt-2">{selectedBatch.finalRouting}</p>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}