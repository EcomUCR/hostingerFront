import { useState } from "react";
import logo from "../../../../img/TukiLogo.png";
import useRegister from "../../infrastructure/useRegister";

type Props = {
onRegisterSuccess?: () => void;
};

export default function RegisterForm({ onRegisterSuccess }: Props) {
const [form, setForm] = useState({
first_name: "",
last_name: "",
email: "",
username: "",
password: "",
password_confirmation: "",
});
const [localError, setLocalError] = useState<string | null>(null);

const { register, loading, error } = useRegister();

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
setForm({ ...form, [e.target.name]: e.target.value });
};

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
setLocalError(null);

if (form.password !== form.password_confirmation) {
  setLocalError("Las contraseñas no coinciden");
  return;
}

const payload = {
  username: form.username,
  email: form.email,
  password: form.password,
  first_name: form.first_name || undefined,
  last_name: form.last_name || undefined,
  role: "CUSTOMER" as const, // valor por defecto
};

try {
  await register(payload);
  onRegisterSuccess?.();
} catch {
  // error ya manejado por el hook
}
};

return (
<div className="flex flex-col items-center w-full justify-center">
<img className="h-20" src={logo} alt="" />
<p className="font-fugaz text-2xl">TucaShop</p>
<div className="flex flex-col w-full items-center space-y-5 mt-10 px-30">
<form
       className="flex flex-col items-center w-full space-y-5"
       onSubmit={handleSubmit}
     >
<div className="flex justify-center gap-5 w-full">
<input
           className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
           placeholder="Nombre"
           type="text"
           name="first_name"
           value={form.first_name}
           onChange={handleChange}
           required
         />
<input
           className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
           placeholder="Apellido"
           type="text"
           name="last_name"
           value={form.last_name}
           onChange={handleChange}
           required
         />
</div>
<div className="flex justify-center items-center flex-col space-y-5 w-full">
<input
           className="border-2 border-main text-main rounded-full px-4 py-3 w-[92%] font-quicksand"
           placeholder="Correo electrónico"
           type="email"
           name="email"
           value={form.email}
           onChange={handleChange}
           required
         />
<input
           className="border-2 border-main text-main rounded-full px-4 py-3 w-[92%] font-quicksand"
           placeholder="Nombre de usuario (opcional)"
           type="text"
           name="username"
           value={form.username}
           onChange={handleChange}
         />
</div>
<div className="flex justify-center gap-5 w-full">
<input
           className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
           placeholder="Contraseña"
           type="password"
           name="password"
           value={form.password}
           onChange={handleChange}
           required
         />
<input
           className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
           placeholder="Confirmar contraseña"
           type="password"
           name="password_confirmation"
           value={form.password_confirmation}
           onChange={handleChange}
           required
         />
</div>
<button
         className="bg-main text-white rounded-full py-3 px-4 w-[50%] font-quicksand"
         type="submit"
         disabled={loading}
       >
{loading ? "Registrando..." : "Crear cuenta"}
</button>
</form>
{localError && <div className="text-red-500">{localError}</div>}
{error && <div className="text-red-500">{error}</div>}
</div>
</div>
);
}