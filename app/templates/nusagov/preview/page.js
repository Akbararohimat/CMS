import NusaGovRenderer from "../components/NusaGovRenderer";
import nusaGovConfig from "../../../../backend/database/seeders/data/nusagov-template-master.json";

export default function NusaGovPreviewPage() {
  return <NusaGovRenderer config={nusaGovConfig} />;
}