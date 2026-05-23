import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { UploadManager } from "@/components/dashboard/upload-manager";

export default function DashboardUploadsPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader
        title="Media Uploads"
        description="Upload and manage cinematic imagery — Cloudinary-ready architecture."
      />
      <UploadManager />
    </div>
  );
}
