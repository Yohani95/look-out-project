"use client";
import React from "react";
import BasePages from "@/app/[locale]/components/common/BasePages";
import { useRouter} from 'next/navigation';
function Error() {
  const router = useRouter();

  const handleReset = () => {
    window.location.reload(true); 
  };
  return (
    <BasePages>
      <div className="text-danger text-center">
        There is a error on this pages.
      </div>
      <div className="d-flex justify-content-center mt-3"> {/* Agregado un contenedor para centrar el botón */}
        <button
          className="btn btn-primary"
          onClick={handleReset}
        >
          try again
        </button>
      </div>            
    </BasePages>
  );
}

export default Error;
