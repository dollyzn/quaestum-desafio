"use client";

import { Button, TextInput } from "@tremor/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/authSlice";
import { AppDispatch, RootState } from "@/redux/store";

import * as Yup from "yup";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [formError, setFormError] = useState<Partial<SignUpFormError>>({});

  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email("Hmm, esse email parece estar estranho, tenta outro")
      .required("O email é obrigatório, não dá para pular essa."),
    password: Yup.string().required(
      "Oops! Não esqueceu de definir sua senha, certo?"
    ),
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData = {
      email: email.trim(),
      password: password,
    };

    try {
      await loginSchema.validate(
        {
          email: email.trim(),
          password: password,
        },
        { abortEarly: false }
      );
      setFormError({});

      console.log(12);

      const resultAction = await dispatch(login(userData));

      if (login.fulfilled.match(resultAction)) {
        toast.success("Usuário autenticado com sucesso!", { theme: "dark" });

        router.push("/");
      } else if (login.rejected.match(resultAction)) {
        console.error("Erro no cadastro:", resultAction.error);

        switch (resultAction.error.message) {
          case "Request failed with status code 401":
            setFormError({
              email:
                "Ops! Parece que algo deu errado. Verifique seu e-mail e/ou senha e tente novamente.",
              password: " ",
            });
            break;
        }
      }
    } catch (error: any) {
      const errors: Errors = {};

      if (error instanceof Yup.ValidationError) {
        error.inner.forEach((err) => {
          if (err.path) errors[err.path] = err.message;
        });
      }

      setFormError(errors);
    }
  };

  return (
    <main className="h-screen bg-gray-50 dark:bg-gray-900">
      <section>
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="https://www.quaestum.com.br"
            className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <svg
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="284px"
              height="89px"
              viewBox="0 0 744.000000 249.000000"
              preserveAspectRatio="xMidYMid meet"
              className="dark:fill-white"
            >
              <g
                transform="translate(0.000000,249.000000) scale(0.100000,-0.100000)"
                stroke="none"
              >
                <path
                  d="M2087 2480 c-84 -21 -162 -83 -202 -159 -34 -67 -39 -178 -10 -251 4
                    -11 -13 -29 -57 -61 -35 -25 -127 -92 -205 -148 l-142 -103 -38 31 c-150 119
                    -396 111 -537 -19 l-45 -42 -123 77 -123 76 0 97 c0 110 -18 161 -81 226 -63
                    65 -106 81 -214 81 -108 0 -147 -15 -212 -81 -62 -62 -83 -115 -83 -214 0 -68
                    5 -93 23 -127 35 -66 78 -110 140 -140 47 -23 70 -28 132 -28 88 0 145 22 209
                    80 l41 37 117 -72 c65 -40 119 -73 120 -74 0 0 -10 -35 -24 -76 -21 -64 -25
                    -89 -21 -166 3 -77 9 -101 36 -156 77 -158 221 -248 394 -248 32 0 58 -3 58
                    -7 0 -5 20 -93 45 -197 25 -104 45 -196 45 -205 0 -9 -24 -32 -52 -51 -190
                    -125 -177 -404 23 -515 48 -27 63 -30 139 -30 98 0 157 23 217 83 89 88 110
                    234 52 350 -47 94 -127 148 -239 161 l-55 6 -47 200 c-26 110 -47 207 -47 215
                    0 8 23 26 52 39 73 35 151 116 189 198 55 118 49 288 -14 391 -16 26 -18 36
                    -9 45 7 7 96 73 199 148 l187 136 33 -28 c62 -54 112 -71 211 -70 257 2 383
                    328 198 509 -72 71 -188 105 -280 82z m181 -106 c116 -68 142 -228 54 -326
                    -49 -55 -99 -78 -167 -78 -138 0 -243 128 -214 260 33 150 195 220 327 144z
                    m-1836 -199 c85 -59 120 -181 79 -270 -35 -76 -124 -135 -201 -135 -77 0 -166
                    59 -201 135 -49 107 8 247 121 294 14 6 55 10 92 8 56 -2 75 -8 110 -32z m858
                    -402 c90 -32 149 -86 201 -183 20 -38 24 -59 24 -140 0 -110 -18 -160 -81
                    -230 -143 -158 -375 -158 -518 0 -62 69 -81 120 -81 225 0 77 4 98 26 146 77
                    164 260 241 429 182z m220 -1253 c19 -5 52 -24 74 -42 102 -84 102 -253 0
                    -337 -143 -117 -358 -16 -358 169 0 149 138 251 284 210z"
                />
                <path
                  d="M5690 1610 l0 -100 -40 0 -40 0 0 -50 0 -50 40 0 40 0 0 -175 0 -175
                    55 0 55 0 0 175 0 175 60 0 60 0 0 50 0 50 -60 0 -60 0 0 100 0 100 -55 0 -55
                    0 0 -100z"
                />
                <path
                  d="M4102 1517 c-51 -19 -98 -62 -123 -113 -32 -68 -32 -175 2 -241 57
                    -109 211 -147 313 -78 45 31 46 31 46 0 0 -24 3 -25 60 -25 l60 0 0 225 0 225
                    -55 0 c-52 0 -55 -1 -55 -25 0 -31 -4 -31 -38 0 -46 43 -139 57 -210 32z m163
                    -97 c14 -5 37 -22 50 -36 21 -23 25 -37 25 -91 0 -96 -42 -143 -127 -143 -113
                    0 -179 143 -106 230 40 48 98 63 158 40z"
                />
                <path
                  d="M4745 1514 c-99 -35 -159 -123 -158 -230 1 -151 113 -246 272 -231
                    47 4 109 25 130 43 2 2 -8 21 -22 43 l-27 40 -35 -14 c-48 -21 -104 -19 -142
                    5 -18 11 -33 23 -33 27 0 5 72 32 159 62 88 30 165 57 172 62 20 12 -18 98
                    -65 145 -62 62 -159 81 -251 48z m154 -110 c17 -14 31 -31 31 -37 0 -13 -217
                    -93 -227 -84 -10 11 7 75 29 102 41 52 118 61 167 19z"
                />
                <path
                  d="M5250 1508 c-55 -29 -83 -77 -76 -132 6 -54 33 -87 92 -114 110 -52
                    119 -57 122 -79 4 -27 -32 -53 -74 -53 -17 0 -48 11 -68 25 -44 30 -45 30 -63
                    8 -36 -47 -36 -51 14 -80 42 -24 58 -28 130 -28 67 0 87 4 109 21 51 38 69 71
                    69 129 0 69 -24 95 -117 131 -98 37 -115 57 -78 94 26 26 66 25 109 -1 18 -11
                    34 -19 35 -17 2 2 12 17 25 35 l22 32 -24 16 c-63 41 -161 46 -227 13z"
                />
                <path
                  d="M6846 1520 c-16 -5 -43 -23 -61 -40 -33 -32 -45 -31 -45 7 0 21 -4
                    23 -55 23 l-55 0 0 -225 0 -225 60 0 60 0 0 123 c0 97 4 130 19 163 35 76 107
                    107 147 63 17 -19 19 -41 22 -185 l4 -164 59 0 59 0 0 127 c0 108 3 133 21
                    170 33 68 99 93 139 53 18 -18 20 -33 20 -185 l0 -165 60 0 60 0 0 183 c0 157
                    -2 187 -18 216 -46 86 -167 94 -258 18 l-31 -26 -13 24 c-25 47 -116 68 -194
                    45z"
                />
                <path
                  d="M2867 1506 c-98 -36 -150 -113 -150 -227 0 -92 30 -152 98 -194 43
                    -26 58 -30 124 -30 64 0 84 4 124 27 l47 27 0 -135 0 -134 60 0 60 0 0 335 0
                    335 -60 0 c-58 0 -60 -1 -60 -27 0 -25 -1 -25 -19 -9 -47 43 -152 57 -224 32z
                    m210 -129 c29 -32 33 -43 33 -92 0 -49 -4 -60 -33 -92 -29 -31 -41 -37 -88
                    -40 -60 -5 -105 16 -135 62 -36 55 -12 148 49 186 25 16 44 19 86 16 47 -3 59
                    -9 88 -40z"
                />
                <path
                  d="M3390 1332 c0 -200 8 -230 71 -264 64 -34 175 -14 224 42 l20 22 5
                    -33 c5 -33 6 -34 58 -37 l52 -3 0 225 0 226 -60 0 -60 0 0 -125 c0 -139 -10
                    -178 -55 -213 -32 -25 -82 -29 -111 -8 -17 13 -19 30 -22 180 l-3 166 -60 0
                    -59 0 0 -178z"
                />
                <path
                  d="M6030 1332 c0 -200 8 -230 71 -264 64 -34 175 -14 224 42 l20 22 5
                    -33 c5 -33 6 -34 58 -37 l52 -3 0 225 0 226 -60 0 -60 0 0 -125 c0 -139 -10
                    -178 -55 -213 -32 -25 -82 -29 -111 -8 -17 13 -19 30 -22 180 l-3 166 -60 0
                    -59 0 0 -178z"
                />
              </g>
            </svg>
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Faça login na sua conta
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    E-mail
                  </label>
                  <TextInput
                    className="w-full p-1"
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={Boolean(formError.email)}
                    errorMessage={formError.email}
                    placeholder="mail@exemplo.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Senha
                  </label>
                  <TextInput
                    className="w-full p-1"
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={Boolean(formError.password)}
                    errorMessage={formError.password}
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Lembrar-me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Esqueceu a senha?
                  </a>
                </div>

                <Button
                  loading={auth.loading}
                  className="w-full dark:!text-white bg-blue-600 border-blue-600 hover:bg-blue-700 hover:border-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:border-blue-600 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:focus:ring-blue-800"
                >
                  Entrar
                </Button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Ainda não tem uma conta?{" "}
                  <a
                    onClick={() => router.push("/signup")}
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Cadastre-se
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
