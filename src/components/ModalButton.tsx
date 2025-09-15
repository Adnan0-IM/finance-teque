import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import ConsultationModal from "./ConsultationModal";

const ModalButton = ({ className, text }: {className?: string, text: string}) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <Button
        size="lg"
        className={`bg-white text-primary hover:bg-gray-100 px-8 py-5 text-base ${className}`}
        onClick={() => setShowModal(true)}
      >
        {text}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      <ConsultationModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default ModalButton;
