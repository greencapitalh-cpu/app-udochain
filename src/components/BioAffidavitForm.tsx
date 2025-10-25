// app-udochain/src/components/BioAffidavitForm.tsx
import { useState } from "react";
import Button from "../ui/Button";
import Input from "../ui/Input";

type Props = {
  onNext: (data: any) => void;
  busy?: boolean;
};

export default function BioAffidavitForm({ onNext, busy }: Props) {
  const [form, setForm] = useState({
    fullName: "",
    idNumber: "",
    birthDateISO: "",
    nationality: "",
    address: "",
    phone: "",
    thumbUsed: "right_thumb",
    accept: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.accept) return alert("Debe aceptar la declaración jurada.");
    onNext(form);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Declaración Jurada de Registro Biométrico</h3>
      <p className="text-sm text-udo-steel">
        Revise y complete sus datos personales antes de registrar su identidad biométrica.
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Input name="fullName" value={form.fullName} onChange={handleChange} placeholder="Nombre completo" required />
        <Input name="idNumber" value={form.idNumber} onChange={handleChange} placeholder="Documento de identidad" required />
        <Input type="date" name="birthDateISO" value={form.birthDateISO} onChange={handleChange} required />
        <Input name="nationality" value={form.nationality} onChange={handleChange} placeholder="Nacionalidad" />
        <Input name="address" value={form.address} onChange={handleChange} placeholder="Dirección" />
        <Input name="phone" value={form.phone} onChange={handleChange} placeholder="Teléfono" />

        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="thumbUsed"
            value="right_thumb"
            checked={form.thumbUsed === "right_thumb"}
            onChange={handleChange}
          />
          <label className="text-sm">Registrar pulgar <b>derecho</b></label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="radio"
            name="thumbUsed"
            value="left_thumb"
            checked={form.thumbUsed === "left_thumb"}
            onChange={handleChange}
          />
          <label className="text-sm">Usar pulgar <b>izquierdo</b> (requiere aprobación especial)</label>
        </div>

        <div className="border-t pt-3 mt-3">
          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" name="accept" checked={form.accept} onChange={handleChange} />
            <span>
              Declaro <b>bajo juramento</b> que los datos consignados son verídicos, y que el
              <b> pulgar {form.thumbUsed === "right_thumb" ? "derecho" : "izquierdo (excepcional)"} </b>
              es el utilizado para mi registro biométrico.  
              Acepto las{" "}
              <a href="/terms.html" target="_blank" className="text-udo-primary underline">
                Condiciones del Servicio
              </a>.
            </span>
          </label>
        </div>

        <Button disabled={busy} type="submit" className="w-full mt-2">
          {busy ? "Guardando..." : "Guardar y continuar"}
        </Button>
      </form>
    </div>
  );
}
