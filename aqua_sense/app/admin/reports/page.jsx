'use client';


import AdminSidebar from '@/components/admin/AdminSidebar';
import GlassCard from '@/components/admin/GlassCard';
import WaveDivider from '@/components/admin/WaveDivider';
import { MapPin, Image as ImageIcon, AlertTriangle, CheckCircle, X, Eye } from 'lucide-react';
import { useEffect, useState } from "react";


export default function StaffReportsPage() {
  const [selectedReport, setSelectedReport] = useState(null);

  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("/api/allreport", {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        console.log("Fetched reports:", data);

        // ✅ CRITICAL FIX
        if (!Array.isArray(data)) {
          console.error("API did not return array:", data);
          return;
        }

        const formattedReports = data.map((r) => ({
          id: r.report_id,
          staffName: r.user_name || "Unknown",
          location: r.location,
          coordinates: "N/A",
          issueType: r.category,
          priority: r.priority,
          description: r.description,
          images: r.photos ?? [],
          submittedOn: new Date(r.created_at).toLocaleString(),
          status: r.status,
        }));

        setReports(formattedReports);
      } catch (err) {
        console.error("Fetch failed:", err);
      }
    };

    fetchReports();
  }, []);

  // const handleReviewAction = (reportId, action) => {
  //   console.log(`${action} report ${reportId}`);
  //   setSelectedReport(null);
  // };
  const handleReviewAction = async (reportId, status) => {
    try {
      const res = await fetch("/api/allreport/status", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          reportId,
          status, // "in_progress" | "closed" | "resolved"
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update report status");
      }

      // ✅ Update UI instantly
      setReports((prev) =>
        prev.map((r) =>
          r.id === reportId ? { ...r, status } : r
        )
      );

      setSelectedReport(null);
    } catch (err) {
      console.error("Action failed:", err);
    }
  };


  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'bg-red-500/20 text-red-700 border-red-500/30';
      case 'High': return 'bg-orange-accent/20 text-orange-accent border-orange-accent/30';
      case 'Medium': return 'bg-shakespeare-500/20 text-shakespeare-700 border-shakespeare-500/30';
      default: return 'bg-green-500/20 text-green-700 border-green-500/30';
    }
  };
  const statusLabel = {
    new: "Pending Review",
    in_progress: "Approved",
    resolved: "Resolved",
    closed: "Rejected",
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-shakespeare-50 via-shakespeare-100 to-aqua-teal/20">
      <div className="fixed left-0 top-0 h-screen w-64 bg-white/20 backdrop-blur-xl border-r border-white/20">

        <AdminSidebar />
      </div>

      <main className="flex-1 overflow-y-auto ml-72">
        {/* Header */}
        <div className=" bg-gradient-to-r from-shakespeare-500 via-shakespeare-600 to-royal-blue overflow-hidden fixed w-full z-50">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full animate-wave bg-gradient-to-br from-white/20 to-transparent" />
          </div>
          <div className="relative z-10 p-8">
            <h1 className="font-display text-4xl font-bold text-white mb-2">
              Staff Field Reports
            </h1>
            <p className="text-shakespeare-100 text-lg">
              Review and approve field submissions
            </p>
          </div>
          <WaveDivider className="absolute -bottom-1" />
        </div>

        {/* Content */}
        <div className="p-8 mt-30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <GlassCard key={report.id} className="p-6 group">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-1">
                      {report.issueType}
                    </h3>
                    <p className="text-sm text-shakespeare-700 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {report.location}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(report.priority)}`}>
                    {report.priority}
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-shakespeare-800 mb-4 line-clamp-3">
                  {report.description}
                </p>

                {/* Images */}
                {report.images.length > 0 && (
                  <div className="flex items-center gap-2 mb-4">
                    <ImageIcon className="w-4 h-4 text-shakespeare-600" />
                    <span className="text-xs text-shakespeare-700">
                      {report.images.length} photo{report.images.length > 1 ? 's' : ''} attached
                    </span>
                  </div>
                )}

                {/* Meta */}
                <div className="flex items-center justify-between mb-4 text-xs text-shakespeare-700">
                  <span>By: {report.staffName}</span>
                  <span>{report.submittedOn}</span>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-2">
                  {report.status === 'Approved' ? (
                    <div className="flex-1 px-3 py-2 rounded-xl bg-green-500/20 text-green-700 font-semibold text-sm flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Approved
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="flex-1 px-4 py-2 rounded-xl bg-shakespeare-500/20 hover:bg-shakespeare-500/30 text-shakespeare-700 font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Review
                      </button>
                    </>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Detail Modal */}
        {selectedReport && (
          <div className="fixed inset-0 bg-shakespeare-950/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <GlassCard className="w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="font-display text-3xl font-bold text-shakespeare-950 mb-2">
                      {selectedReport.issueType}
                    </h2>
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${getPriorityColor(selectedReport.priority)}`}>
                      <AlertTriangle className="w-4 h-4" />
                      {selectedReport.priority} Priority
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedReport(null)}
                    className="w-10 h-10 rounded-full bg-shakespeare-200/50 hover:bg-shakespeare-300/50 flex items-center justify-center transition-all duration-300"
                  >
                    <X className="w-5 h-5 text-shakespeare-950" />
                  </button>
                </div>

                <WaveDivider />

                {/* Staff & Location Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 rounded-2xl bg-shakespeare-500/10 border border-shakespeare-400/30">
                    <p className="text-xs text-shakespeare-700 font-semibold mb-1">Submitted By</p>
                    <p className="text-sm text-shakespeare-950 font-bold">{selectedReport.staffName}</p>
                    <p className="text-xs text-shakespeare-700">{selectedReport.submittedOn}</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-shakespeare-500/10 border border-shakespeare-400/30">
                    <p className="text-xs text-shakespeare-700 font-semibold mb-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      Location
                    </p>
                    <p className="text-sm text-shakespeare-950 font-bold">{selectedReport.location}</p>
                    <p className="text-xs text-shakespeare-700">{selectedReport.coordinates}</p>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-3">
                    Issue Description
                  </h3>
                  <p className="text-shakespeare-800 leading-relaxed p-4 rounded-2xl bg-white/5">
                    {selectedReport.description}
                  </p>
                </div>

                {/* Images */}
                {selectedReport.images.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-display text-lg font-bold text-shakespeare-950 mb-3 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" />
                      Attached Photos ({selectedReport.images.length})
                    </h3>
                    {/* <div className="grid grid-cols-2 gap-4">
                      {selectedReport.images.map((img, idx) => (
                        <div key={idx} className="aspect-video rounded-2xl bg-shakespeare-200/30 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-br from-shakespeare-300 to-shakespeare-500 flex items-center justify-center">
                            <ImageIcon className="w-12 h-12 text-white/50" />
                          </div>
                        </div>
                      ))}
                    </div> */}
                    <div className="grid grid-cols-2 gap-4">
                      {selectedReport.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="aspect-video rounded-2xl overflow-hidden border"
                        >
                          <img
                            src={img}
                            alt={`Report image ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}

                {/* <div className="flex gap-4">
                  <button
                    onClick={() =>
                      handleReviewAction(selectedReport.id, "closed")
                    }
                    className="flex-1 px-6 py-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 font-semibold transition-all"
                  >
                    Reject Report
                  </button>

                  <button
                    onClick={() =>
                      handleReviewAction(selectedReport.id, "in_progress")
                    }
                    className="flex-1 px-6 py-4 rounded-xl bg-green-600 text-white font-semibold flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve Report
                  </button>
                </div> */}
                {/* Actions or Status */}
                {selectedReport.status === "new" ? (
                  <div className="flex gap-4">
                    <button
                      onClick={() =>
                        handleReviewAction(selectedReport.id, "closed")
                      }
                      className="flex-1 px-6 py-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-600 font-semibold"
                    >
                      Reject Report
                    </button>

                    <button
                      onClick={() =>
                        handleReviewAction(selectedReport.id, "in_progress")
                      }
                      className="flex-1 px-6 py-4 rounded-xl bg-green-600 text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve Report
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <span className="px-4 py-2 rounded-full text-sm font-semibold">
                      Status: {statusLabel[selectedReport.status]}
                    </span>
                  </div>
                )}


              </div>
            </GlassCard>
          </div>
        )}
      </main>
    </div>
  );
}
