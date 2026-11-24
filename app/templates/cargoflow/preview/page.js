import CargoFlowRenderer from "../components/CargoFlowRenderer";
import cargoFlowConfig from "../../../../backend/database/seeders/data/cargoflow-template-master.json";

export default function CargoFlowPreviewPage() {
  return <CargoFlowRenderer config={cargoFlowConfig} />;
}