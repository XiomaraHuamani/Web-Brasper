"use client";

import PageBanner from "@/components/PageBanner";
import Layout from "@/layout";
import { useState } from "react";

const blogPosts = [
  {
    slug: "guia-completa-brasil",
    title: "Guía completa para extranjeros y residentes temporales",
    image: "/images/blog1.jpg",
    excerpt:
      "Si estás considerando establecerte en Brasil, abrir una cuenta bancaria es esencial. Te explicamos cómo hacerlo...",
    date: "Marzo 4, 2025",
    content: [
      {
        type: "paragraph",
        text: "Brasil ha sido históricamente un destino atractivo para inmigrantes y visitantes internacionales. Si estás considerando establecerte en el país, abrir una cuenta bancaria es un paso esencial para gestionar tus finanzas de manera eficiente. En esta guía, te explicamos todo lo que necesitas saber para abrir una cuenta bancaria en Brasil como extranjero o residente temporal.",
      },
      { type: "title", text: "Tipos de cuentas bancarias disponibles" },
      { type: "subtitle", text: "Cuenta corriente (Conta Corrente)" },
      {
        type: "paragraph",
        text: "Es la opción más versátil, ideal para realizar transacciones ilimitadas y acceder a servicios financieros como tarjetas de débito y crédito. Es recomendable para quienes necesitan operar con frecuencia en el sistema bancario brasileño.",
      },
      { type: "subtitle", text: "Cuenta de ahorro (Conta Poupança)" },
      {
        type: "paragraph",
        text: "Si deseas ahorrar dinero mientras estás en Brasil, esta cuenta es ideal. Ofrece intereses sobre los depósitos y está protegida por el gobierno, aunque tiene límites en transacciones y servicios.",
      },
      { type: "subtitle", text: "Cuenta digital (Conta Digital)" },
      {
        type: "paragraph",
        text: "Si deseas ahorrar dinero mientras estás en Brasil, esta cuenta es ideal. Ofrece intereses sobre los depósitos y está protegida por el gobierno, aunque tiene límites en transacciones y servicios.",
      },
      { type: "title", text: "Documentación necesaria" },
      {
        type: "paragraph",
        text: "Para abrir una cuenta bancaria en Brasil, necesitarás presentar los siguientes documentos:",
      },
      {
        type: "list",
        items: [
          "Pasaporte vigente - Documento de identificación principal.",
          "CPF (Cadastro de Pessoas Físicas) - Número de identificación fiscal brasileño.",
          "Comprobante de residencia - Puede ser un contrato de alquiler, factura de servicios o una declaración de hospedaje.",
          "Comprobante de ingresos - Carta laboral, extractos bancarios o declaración de impuestos.",
          "RNE o CIE - Registro Nacional de Extranjeros o Cédula de Identidad de Extranjero (para residentes).",
          "Visa válida - Dependiendo de tu situación migratoria.",
        ],
      },
      { type: "title", text: "Proceso paso a paso" },
      {
        type: "list",
        items: [
          "Obtén tu CPF - Puedes tramitarlo en consulados brasileños en el extranjero o en oficinas de la Receita Federal en Brasil.",
          "Selecciona el banco adecuado - Evalúa opciones según tus necesidades:\n  - **Bancos tradicionales:** Banco do Brasil, Caixa Econômica Federal, Bradesco, Itaú, Santander.\n  - **Bancos digitales:** Nubank, Inter, PicPay, C6 Bank.",
          "Agenda una cita - Los bancos tradicionales suelen requerir visitas presenciales para extranjeros.",
          "Presenta tu documentación - Asegúrate de llevar todos los documentos requeridos, preferiblemente traducidos de manera juramentada.",
          "Firma el contrato - Lee detenidamente las condiciones, tarifas y servicios incluidos.",
          "Activa tus servicios digitales - Solicita acceso a la banca por internet y aplicaciones móviles para gestionar tu cuenta de manera remota.",
        ],
      },
      { type: "title", text: "Consideraciones importantes" },
      {
        type: "list",
        items: [
          "Tarifas bancarias - Compara opciones, ya que muchos bancos cobran comisiones por mantenimiento y servicios.",
          "Transferencias internacionales - Consulta las tarifas y acuerdos para envío y recepción de dinero desde otros países.",
          "Idioma - La mayoría de los servicios bancarios están en portugués. Si no dominas el idioma, lleva un traductor contigo.",
          "Aplicaciones móviles - La banca digital en Brasil es altamente eficiente y facilita la gestión financiera sin necesidad de acudir a sucursales.",
          "Tarjetas de crédito - Los extranjeros pueden enfrentar requisitos más estrictos para obtener una tarjeta de crédito, como la exigencia de depósitos de garantía.",
        ],
      },
      {
        type: "paragraph",
        text: "Abrir una cuenta bancaria en Brasil facilitará tu vida financiera, permitiéndote realizar pagos cotidianos, recibir tu salario y evitar costos elevados por uso de tarjetas internacionales.",
      },
      { type: "title", text: "¿Necesitas enviar dinero entre Perú y Brasil?" },
      {
        type: "paragraph",
        text: "Nuestra empresa te ofrece las mejores tasas del mercado sin complicaciones. Cotiza con nosotros antes de tu viaje y durante tu estadía en Brasil.",
      },
    ],
  },
];

const Blog = () => {
  const [selectedPost, setSelectedPost] = useState(null);

  return (
    <Layout>
      <PageBanner pageName={"Blogs Brasper"} />

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          {selectedPost ? (
            <article className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
              <button
                onClick={() => setSelectedPost(null)}
                className="text-blue-600 hover:underline mb-6 flex items-center"
              >
                ← Volver al Blog
              </button>
              <p className="text-gray-500 text-sm mb-4">{selectedPost.date}</p>
              <h1 className="text-4xl font-bold mb-4">{selectedPost.title}</h1>
              <div className="prose prose-lg max-w-full text-gray-700 space-y-4">
                {selectedPost.content.map((item, index) => {
                  if (item.type === "title") {
                    return (
                      <h4 key={index} className="text-2xl font-bold">
                        {item.text}
                      </h4>
                    );
                  }
                  if (item.type === "subtitle") {
                    return (
                      <h6 key={index} className="text-xl font-semibold">
                        {item.text}
                      </h6>
                    );
                  }
                  if (item.type === "paragraph") {
                    return <p key={index}>{item.text}</p>;
                  }
                  if (item.type === "list") {
                    return (
                      <ul key={index} className="list-disc ml-6 space-y-1">
                        {item.items.map((listItem, i) => (
                          <li
                            key={i}
                            dangerouslySetInnerHTML={{ __html: listItem }}
                          ></li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
              <div className="image">
                <img
                  src="assets/images/blog/blogs.jpg"
                  alt="Blog"
                  width={300}
                  height="auto"
                />
              </div>
            </article>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <div
                  key={post.slug}
                  className="rounded-lg shadow-md overflow-hidden cursor-pointer bg-white hover:shadow-xl transition p-6"
                  onClick={() => setSelectedPost(post)}
                >
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600">{post.excerpt}</p>
                  <p className="text-gray-400 text-sm mb-4">{post.date}</p>
                  <a className="text-blue-600 block font-medium">Leer más →</a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <footer className="bg-gray-900 text-white text-center py-4">
        © 2025 Brasper. Todos los derechos reservados.
      </footer>
    </Layout>
  );
};

export default Blog;
