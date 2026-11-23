import SchoolMateRenderer from "../components/SchoolMateRenderer";
import schoolMateConfig from "../../../../backend/database/seeders/data/schoolmate-template-master.json";
import "../schoolmate.css";

export default function SchoolMatePreviewPage() {
  return <SchoolMateRenderer config={schoolMateConfig} />;
}
