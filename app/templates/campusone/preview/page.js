import CampusOneRenderer from "../components/CampusOneRenderer";
import campusOneConfig from "../../../../backend/database/seeders/data/campusone-template-master.json";
import "../campusone.css";

export default function CampusOnePreviewPage() {
  return <CampusOneRenderer config={campusOneConfig} />;
}
