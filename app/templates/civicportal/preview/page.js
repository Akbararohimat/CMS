import CivicPortalRenderer from "../components/CivicPortalRenderer";
import civicPortalConfig from "../../../../backend/database/seeders/data/civicportal-template-master.json";
import "../civicportal.css";

export default function CivicPortalPreviewPage() {
  return <CivicPortalRenderer config={civicPortalConfig} />;
}
