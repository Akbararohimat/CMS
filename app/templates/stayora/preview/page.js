import StayoraRenderer from "../components/StayoraRenderer";
import stayoraConfig from "../../../../backend/database/seeders/data/stayora-template-master.json";

export default function StayoraPreviewPage() {
  return <StayoraRenderer config={stayoraConfig} />;
}
