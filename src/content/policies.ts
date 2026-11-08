import { company, type Locale } from "./site";

export type PolicyKind = "privacy" | "terms";
export type PolicySection = {
  id: string;
  title: string;
  paragraphs: string[];
  links?: { label: string; href: string }[];
};
export type PolicyDocument = {
  title: string;
  intro: string;
  updated: string;
  contents: string;
  sections: PolicySection[];
};
const email = company.email;
const providers = [
  { label: "OpenAI · EU", href: "https://openai.com/policies/eu-privacy-policy/" },
  { label: "Google", href: "https://policies.google.com/privacy" },
  { label: "Cloudflare", href: "https://www.cloudflare.com/privacypolicy/" },
];

export const policies: Record<Locale, Record<PolicyKind, PolicyDocument>> = {
  en: {
    privacy: {
      title: "Privacy policy",
      intro:
        "How GarBar handles information when you visit our company website or contact us. TaskFlow and Lucid Saga have their own privacy policies for their apps and services.",
      updated: "Updated 8 November 2026",
      contents: "In this policy",
      sections: [
        {
          id: "controller",
          title: "1. Who is responsible",
          paragraphs: [
            `GarBar is the public brand of ${company.name}, NIF ${company.taxId}, with registered address at ${company.address}. We are responsible for the personal information handled for this company website and our company correspondence. Our full register details are available on the company information page.`,
            `For privacy questions and requests, write to ${email} or to our registered address. You do not need to use a particular form or subject line. This notice explains processing; visiting the website is not blanket consent to unrelated data use.`,
          ],
        },
        {
          id: "scope",
          title: "2. What this policy covers",
          paragraphs: [
            "These pages introduce the company and link to our products. They do not provide TaskFlow’s task capture or Lucid Saga’s storytelling service. Product accounts, recordings, stories, files, subscriptions and product support are described in each product’s own policy. Following a product link does not automatically create an account or send it the contents of an email to us.",
          ],
        },
        {
          id: "information",
          title: "3. Information handled",
          paragraphs: [
            "Website delivery and security involve technical connection information such as IP addresses, requested URLs, request times, browser information and error or abuse signals. If you email us, we receive your address, any name or contact details you provide, the message and any attachments you choose to send. Only information necessary to answer your enquiry is needed; avoid sending passwords, payment-card details or unnecessary sensitive information.",
            "The company pages have no contact form, advertising trackers, marketing analytics, app-account database or AI submission feature. If a private version of the website requires ChatGPT sign-in, the hosting platform handles authentication under its own account and privacy rules. We do not receive your ChatGPT password.",
          ],
        },
        {
          id: "purposes",
          title: "4. Purposes and legal bases",
          paragraphs: [
            "We handle ordinary company enquiries and protect the website on the basis of our legitimate interests in answering correspondence, maintaining availability and preventing abuse (GDPR Article 6(1)(f)), balanced against your rights. If you request steps toward a contract, the necessary correspondence may instead rely on Article 6(1)(b). Legal obligations, including handling data-rights requests and required records, rely on Article 6(1)(c).",
            "We do not sell personal information or use correspondence for advertising profiles. We do not make decisions about you with legal or similarly significant effects through automated processing. Any optional purpose requiring consent would need its own information and choice; this policy itself does not provide that consent.",
          ],
        },
        {
          id: "providers",
          title: "5. Providers and recipients",
          paragraphs: [
            "Google Workspace handles the company mailbox, including receiving, storing and replying to messages and attachments. The current private website is hosted through OpenAI Sites, with Cloudflare infrastructure for delivery and protection. Hosting and identity services handle the connection or account information necessary for those functions. Providers’ notices explain processing they perform for their own accounts, security and legal obligations.",
            "Access to correspondence is limited to people authorised to handle it. Information may also be shared with professional advisers or competent authorities where necessary for a legal obligation or claim. A link to another website takes you to that operator’s services and privacy information.",
          ],
          links: providers,
        },
        {
          id: "transfers",
          title: "6. International processing",
          paragraphs: [
            "Email, hosting, identity and support providers may process information outside the European Economic Area. An EU company address is not a promise of EU-only processing. Where a transfer requires safeguards, the applicable mechanism must cover that recipient and processing, such as a relevant adequacy decision or contractual safeguards. You can ask us for the mechanism and safeguards applicable to your information.",
          ],
        },
        {
          id: "retention",
          title: "7. How long information is kept",
          paragraphs: [
            "We keep correspondence while dealing with the enquiry and, where necessary, for the applicable obligation or legal-claim period. Technical records are limited by their delivery, troubleshooting and security purposes and the hosting provider’s applicable retention arrangements. Ask us about the period and any exception relevant to your request.",
            "Where information must be retained for an obligation or claim, access is restricted to that purpose. Provider recovery copies and independent legal or security records may expire on different schedules; deletion is not a promise of immediate removal from every backup.",
          ],
        },
        {
          id: "cookies",
          title: "8. Cookies and browser features",
          paragraphs: [
            "The company pages do not set advertising or analytics cookies or store a language preference: the language is part of the page address. The email-copy button uses your device’s clipboard only when you press it. Opening an email link creates a draft in your mail application; it does not automatically send a message.",
            "The hosting platform may use necessary session and security storage when private access requires sign-in. Its notices explain that storage. Browser settings can clear stored data, which may sign you out; doing so does not erase correspondence already sent. Optional non-essential tracking would require its own applicable notice and consent mechanism.",
          ],
        },
        {
          id: "rights",
          title: "9. Your rights",
          paragraphs: [
            `Depending on the processing, you may request access, correction, erasure or restriction; object to legitimate-interest processing; and request portability where the legal conditions apply. If processing relies on consent, you can withdraw it without undoing earlier lawful processing. Contact ${email} or our registered address. We verify identity proportionately and do not ask for your password.`,
            "Requests are normally free and answered within one month. Where the law permits an extension because of complexity or the number of requests, we explain it within the first month. You can complain to the Spanish Data Protection Agency (AEPD), including if you disagree with our response.",
          ],
          links: [
            {
              label: "Your rights at the AEPD",
              href: "https://www.aepd.es/derechos-y-deberes/ejerce-tus-derechos",
            },
          ],
        },
        {
          id: "security",
          title: "10. Security and updates",
          paragraphs: [
            "We use HTTPS for the website and limit access to company correspondence. No website or email service can offer an absolute security guarantee. Product age limits and product-specific permissions are stated in their own notices; they are not inferred from these company pages.",
            "We identify updates by the date on this policy and provide any additional notice required for a material change in processing. The English, Spanish and Catalan versions are intended to explain the same practices.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms & conditions",
      intro:
        "Terms for visiting the GarBar company website. The use of TaskFlow, Lucid Saga and any paid product is governed by the terms presented for that product.",
      updated: "Effective 8 November 2026",
      contents: "In these terms",
      sections: [
        {
          id: "operator",
          title: "1. The company and these terms",
          paragraphs: [
            `GarBar is the public brand of ${company.name}, NIF ${company.taxId}, registered at ${company.address}. The company information page provides the commercial-register details. For enquiries or complaints, contact ${email} or our registered address.`,
            "These terms concern this informational company website. They do not replace the separate terms and privacy policies of TaskFlow or Lucid Saga. The privacy policy explains the personal information associated with visits and correspondence.",
          ],
        },
        {
          id: "access",
          title: "2. Access and product availability",
          paragraphs: [
            "The company pages are free to read, apart from your own connection costs. They do not operate a checkout, take subscription payments or create a product account. A private preview may require the hosting platform’s sign-in; that is not a GarBar product subscription.",
            "Reading the website, opening an email draft or following a link does not buy a product. A coming-soon announcement, illustration or development description is not a promise that an app, price or planned feature is already available. Refer to the relevant product’s current website or store listing.",
          ],
        },
        {
          id: "use",
          title: "3. Responsible use",
          paragraphs: [
            "Use the website lawfully and respect other people’s rights. Do not introduce malware, interfere with availability, attempt unauthorised access, impersonate the company or use its contact channel for unlawful or abusive messages. Reasonable security measures may be applied to protect the website, subject to applicable rights.",
          ],
        },
        {
          id: "property",
          title: "4. Content and intellectual property",
          paragraphs: [
            "The website’s text, artwork, software and brand assets belong to their respective rights holders. You may access the pages for their intended purpose, share links and exercise uses permitted by law. These terms do not transfer ownership or grant a right to impersonate GarBar or suggest an endorsement. Third-party and open-source licences remain applicable.",
          ],
        },
        {
          id: "products",
          title: "5. Product websites and external links",
          paragraphs: [
            "Product features, eligibility, account deletion, AI use and any purchase conditions are explained on the relevant product website. If a paid offer becomes available, its price, renewal, cancellation and consumer information must be presented through that offer; no purchase terms are created by this company overview.",
            "Other websites and platforms have their own terms and privacy notices. Linking to them does not remove our own legal responsibilities or limit mandatory rights.",
          ],
        },
        {
          id: "responsibility",
          title: "6. Availability and responsibility",
          paragraphs: [
            "We aim to keep company information accurate and welcome reports of errors. Maintenance, faults or security events can interrupt access. We remain responsible as required by applicable law; there is no blanket exclusion of liability or waiver of mandatory consumer, privacy or other protected rights.",
          ],
        },
        {
          id: "law",
          title: "7. Questions, law and changes",
          paragraphs: [
            `Send questions, complaints or reports about this website to ${email}. We handle them within the applicable legal deadlines. Spanish law applies without removing mandatory protections that apply to a consumer in their country of habitual residence. Courts are determined by the applicable jurisdiction rules, not by an exclusive requirement to use our home city.`,
            "Updates are identified by their effective date and apply prospectively, subject to any notice required by law. They do not remove accrued rights or retrospectively change a completed product purchase. English, Spanish and Catalan versions are intended to convey the same conditions.",
          ],
        },
      ],
    },
  },
  es: {
    privacy: {
      title: "Política de privacidad",
      intro:
        "Cómo trata GarBar la información cuando visitas nuestra web corporativa o contactas con nosotros. TaskFlow y Lucid Saga tienen sus propias políticas para sus aplicaciones y servicios.",
      updated: "Actualizada el 8 de noviembre de 2026",
      contents: "En esta política",
      sections: [
        {
          id: "controller",
          title: "1. Quién es responsable",
          paragraphs: [
            `GarBar es la marca pública de ${company.name}, NIF ${company.taxId}, con domicilio social en ${company.address}. Somos responsables de los datos tratados para esta web corporativa y la correspondencia de la empresa. Los datos registrales completos están en la página de información de la empresa.`,
            `Para consultas o solicitudes de privacidad, escribe a ${email} o a nuestro domicilio social. No necesitas un formulario ni un asunto concretos. Este aviso explica el tratamiento: visitar la web no supone consentir cualquier uso de datos.`,
          ],
        },
        {
          id: "scope",
          title: "2. Qué cubre esta política",
          paragraphs: [
            "Estas páginas presentan la empresa y enlazan a nuestros productos. No ofrecen la captura de tareas de TaskFlow ni las historias de Lucid Saga. Las cuentas, grabaciones, historias, archivos, suscripciones y soporte de cada producto se explican en su propia política. Seguir un enlace no crea automáticamente una cuenta ni envía al producto el contenido de un correo dirigido a nosotros.",
          ],
        },
        {
          id: "information",
          title: "3. Información que se trata",
          paragraphs: [
            "La entrega y protección de la web implican datos técnicos como dirección IP, URL solicitada, fecha y hora, información del navegador y señales de errores o abuso. Si nos escribes, recibimos tu correo, el nombre o datos de contacto que facilites, el mensaje y los adjuntos que decidas enviar. Solo hace falta la información necesaria para atender tu consulta; evita contraseñas, datos de tarjeta o información sensible innecesaria.",
            "Las páginas corporativas no incluyen formularios de contacto, rastreadores publicitarios, analítica de marketing, una base de datos de cuentas de las apps ni envío de contenido a IA. Si una versión privada requiere iniciar sesión con ChatGPT, la plataforma de alojamiento gestiona esa identificación conforme a sus propias reglas de cuenta y privacidad. No recibimos tu contraseña de ChatGPT.",
          ],
        },
        {
          id: "purposes",
          title: "4. Finalidades y bases jurídicas",
          paragraphs: [
            "Atendemos consultas ordinarias y protegemos la web por nuestro interés legítimo en responder a la correspondencia, mantener la disponibilidad y evitar abusos, ponderado con tus derechos (artículo 6.1.f del RGPD). Si solicitas actuaciones previas a un contrato, la correspondencia necesaria puede basarse en el artículo 6.1.b. El cumplimiento de obligaciones legales, incluidas solicitudes de derechos y registros exigibles, se basa en el artículo 6.1.c.",
            "No vendemos datos personales ni usamos la correspondencia para perfiles publicitarios. No tomamos decisiones automatizadas sobre ti con efectos jurídicos o de importancia similar. Una finalidad opcional que necesite consentimiento requeriría información y elección propias; esta política no constituye ese consentimiento.",
          ],
        },
        {
          id: "providers",
          title: "5. Proveedores y destinatarios",
          paragraphs: [
            "Google Workspace gestiona el correo de la empresa, incluidos recepción, almacenamiento y respuesta a mensajes y adjuntos. La web privada actual se aloja mediante OpenAI Sites, con infraestructura de Cloudflare para su entrega y protección. Los servicios de alojamiento e identidad tratan los datos de conexión o cuenta necesarios para esas funciones. Sus avisos explican los tratamientos propios de cuenta, seguridad y obligaciones legales.",
            "El acceso a la correspondencia se limita a personas autorizadas para atenderla. También puede comunicarse información a asesores profesionales o autoridades competentes cuando sea necesario por una obligación legal o reclamación. Un enlace externo lleva a los servicios y la información de privacidad de ese operador.",
          ],
          links: providers,
        },
        {
          id: "transfers",
          title: "6. Tratamiento internacional",
          paragraphs: [
            "Los proveedores de correo, alojamiento, identidad y soporte pueden tratar información fuera del Espacio Económico Europeo. Un domicilio empresarial en la UE no garantiza un tratamiento exclusivamente europeo. Cuando una transferencia requiera garantías, el mecanismo aplicable debe cubrir al destinatario y tratamiento, como una decisión de adecuación pertinente o garantías contractuales. Puedes pedirnos información sobre el mecanismo y las garantías aplicables a tus datos.",
          ],
        },
        {
          id: "retention",
          title: "7. Plazos de conservación",
          paragraphs: [
            "Conservamos la correspondencia mientras atendemos la consulta y, cuando sea necesario, durante el plazo de la obligación o reclamación aplicable. Los registros técnicos se limitan por sus finalidades de entrega, diagnóstico y seguridad y los plazos aplicables del alojamiento. Puedes consultar el plazo y las excepciones relevantes para tu solicitud.",
            "Cuando deban conservarse datos por una obligación o reclamación, el acceso se restringe a esa finalidad. Las copias de recuperación y registros propios legales o de seguridad del proveedor pueden caducar en otros momentos; la supresión no garantiza un borrado inmediato de todas las copias.",
          ],
        },
        {
          id: "cookies",
          title: "8. Cookies y funciones del navegador",
          paragraphs: [
            "Las páginas corporativas no instalan cookies de publicidad o analítica ni guardan una preferencia de idioma: el idioma forma parte de la dirección de la página. El botón para copiar el correo usa el portapapeles del dispositivo solo al pulsarlo. Abrir un enlace de correo crea un borrador en tu aplicación; no envía automáticamente un mensaje.",
            "La plataforma puede utilizar almacenamiento necesario de sesión y seguridad cuando el acceso privado requiere identificación. Sus avisos explican ese almacenamiento. Borrarlo desde el navegador puede cerrar tu sesión, pero no elimina correos ya enviados. Un seguimiento opcional no necesario requeriría su información y mecanismo de consentimiento aplicables.",
          ],
        },
        {
          id: "rights",
          title: "9. Tus derechos",
          paragraphs: [
            `Según el tratamiento, puedes solicitar acceso, rectificación, supresión o limitación; oponerte a tratamientos por interés legítimo; y pedir portabilidad cuando se cumplan sus requisitos. Si se utiliza consentimiento, puedes retirarlo sin afectar a la licitud anterior. Escribe a ${email} o al domicilio social. Verificamos la identidad proporcionalmente y no pedimos tu contraseña.`,
            "Las solicitudes son normalmente gratuitas y se responden en un mes. Si la ley permite ampliar el plazo por complejidad o número de solicitudes, lo explicamos dentro del primer mes. Puedes reclamar ante la Agencia Española de Protección de Datos (AEPD), también si no estás de acuerdo con nuestra respuesta.",
          ],
          links: [
            {
              label: "Tus derechos en la AEPD",
              href: "https://www.aepd.es/derechos-y-deberes/ejerce-tus-derechos",
            },
          ],
        },
        {
          id: "security",
          title: "10. Seguridad y actualizaciones",
          paragraphs: [
            "La web utiliza HTTPS y limitamos el acceso a la correspondencia empresarial. Ningún servicio web o de correo puede ofrecer una garantía absoluta de seguridad. Los límites de edad y permisos específicos se indican en los avisos de cada producto; no se deducen de estas páginas corporativas.",
            "Identificamos las actualizaciones mediante la fecha de esta política y facilitamos el aviso adicional que corresponda ante un cambio relevante del tratamiento. Las versiones española, catalana e inglesa buscan explicar las mismas prácticas.",
          ],
        },
      ],
    },
    terms: {
      title: "Términos y condiciones",
      intro:
        "Condiciones de visita de la web corporativa de GarBar. El uso de TaskFlow, Lucid Saga y cualquier producto de pago se rige por las condiciones presentadas para ese producto.",
      updated: "En vigor desde el 8 de noviembre de 2026",
      contents: "En estas condiciones",
      sections: [
        {
          id: "operator",
          title: "1. La empresa y estas condiciones",
          paragraphs: [
            `GarBar es la marca pública de ${company.name}, NIF ${company.taxId}, con domicilio en ${company.address}. La página de información de la empresa recoge los datos registrales. Para consultas o reclamaciones, escribe a ${email} o a nuestro domicilio social.`,
            "Estas condiciones se refieren a esta web corporativa informativa. No sustituyen las condiciones ni las políticas de privacidad de TaskFlow o Lucid Saga. La política de privacidad explica los datos asociados a visitas y correspondencia.",
          ],
        },
        {
          id: "access",
          title: "2. Acceso y disponibilidad de productos",
          paragraphs: [
            "Consultar estas páginas es gratuito, sin perjuicio de tus costes de conexión. No gestionan un proceso de compra, cobran suscripciones ni crean cuentas de producto. Una versión privada puede requerir la identificación de la plataforma de alojamiento; no es una suscripción a un producto de GarBar.",
            "Leer la web, abrir un borrador de correo o seguir un enlace no compra un producto. Un anuncio de próximo lanzamiento, ilustración o descripción de desarrollo no garantiza que una app, precio o función prevista ya esté disponible. Consulta la web o ficha de tienda actual del producto.",
          ],
        },
        {
          id: "use",
          title: "3. Uso responsable",
          paragraphs: [
            "Utiliza la web lícitamente y respeta los derechos de otras personas. No introduzcas malware, alteres su disponibilidad, intentes accesos no autorizados, suplantes a la empresa ni uses el contacto para mensajes ilícitos o abusivos. Pueden aplicarse medidas razonables de protección, respetando los derechos aplicables.",
          ],
        },
        {
          id: "property",
          title: "4. Contenido y propiedad intelectual",
          paragraphs: [
            "Los textos, imágenes, software y elementos de marca pertenecen a sus respectivos titulares. Puedes consultar las páginas para su finalidad, compartir enlaces y ejercer los usos permitidos por la ley. Estas condiciones no transmiten la propiedad ni permiten suplantar a GarBar o aparentar su respaldo. Se mantienen las licencias de terceros y de código abierto que correspondan.",
          ],
        },
        {
          id: "products",
          title: "5. Webs de producto y enlaces externos",
          paragraphs: [
            "Las funciones, requisitos de uso, eliminación de cuentas, IA y condiciones de compra se explican en la web del producto. Si se ofrece un servicio de pago, su precio, renovación, cancelación e información de consumo deben presentarse con la oferta; esta presentación corporativa no crea condiciones de compra.",
            "Las demás webs y plataformas tienen sus propias condiciones y avisos de privacidad. Enlazarlas no elimina nuestras obligaciones legales ni limita derechos imperativos.",
          ],
        },
        {
          id: "responsibility",
          title: "6. Disponibilidad y responsabilidad",
          paragraphs: [
            "Procuramos mantener correcta la información de la empresa y agradecemos avisos de errores. El mantenimiento, fallos o incidentes de seguridad pueden interrumpir el acceso. Respondemos según la ley aplicable; no existe una exclusión general de responsabilidad ni una renuncia a derechos imperativos de consumo, privacidad u otros protegidos.",
          ],
        },
        {
          id: "law",
          title: "7. Contacto, ley y cambios",
          paragraphs: [
            `Envía consultas, reclamaciones o avisos sobre esta web a ${email}. Los atendemos dentro de los plazos legales aplicables. Se aplica la ley española sin privar al consumidor de las protecciones imperativas de su país de residencia habitual cuando correspondan. La competencia judicial la determina la normativa aplicable, sin imponer los tribunales de nuestra ciudad.`,
            "Los cambios se identifican por su fecha de eficacia y se aplican hacia el futuro, con el aviso legalmente necesario. No eliminan derechos adquiridos ni modifican retroactivamente una compra de producto ya realizada. Las versiones española, catalana e inglesa buscan expresar las mismas condiciones.",
          ],
        },
      ],
    },
  },
  ca: {
    privacy: {
      title: "Política de privacitat",
      intro:
        "Com tracta GarBar la informació quan visites el nostre web corporatiu o contactes amb nosaltres. TaskFlow i Lucid Saga tenen les seves pròpies polítiques per a les aplicacions i serveis.",
      updated: "Actualitzada el 8 de novembre de 2026",
      contents: "En aquesta política",
      sections: [
        {
          id: "controller",
          title: "1. Qui n’és responsable",
          paragraphs: [
            `GarBar és la marca pública de ${company.name}, NIF ${company.taxId}, amb domicili social a ${company.address}. Som responsables de les dades tractades per a aquest web corporatiu i la correspondència de l’empresa. Les dades registrals completes són a la pàgina d’informació de l’empresa.`,
            `Per a consultes o sol·licituds de privacitat, escriu a ${email} o al domicili social. No cal cap formulari ni assumpte concret. Aquest avís explica el tractament: visitar el web no implica consentir qualsevol ús de dades.`,
          ],
        },
        {
          id: "scope",
          title: "2. Què cobreix aquesta política",
          paragraphs: [
            "Aquestes pàgines presenten l’empresa i enllacen als nostres productes. No ofereixen la captura de tasques de TaskFlow ni les històries de Lucid Saga. Els comptes, gravacions, històries, fitxers, subscripcions i suport de cada producte s’expliquen a la seva política. Seguir un enllaç no crea automàticament un compte ni envia al producte el contingut d’un correu adreçat a nosaltres.",
          ],
        },
        {
          id: "information",
          title: "3. Informació que es tracta",
          paragraphs: [
            "La distribució i protecció del web impliquen dades tècniques com l’adreça IP, URL sol·licitat, data i hora, informació del navegador i senyals d’errors o abús. Si ens escrius, rebem el correu, nom o dades de contacte que facilitis, el missatge i els adjunts que decideixis enviar. Només cal la informació necessària per atendre la consulta; evita contrasenyes, dades de targeta o informació sensible innecessària.",
            "Les pàgines corporatives no inclouen formularis de contacte, rastrejadors publicitaris, analítica de màrqueting, una base de dades de comptes de les apps ni enviament de contingut a IA. Si una versió privada requereix identificar-se amb ChatGPT, la plataforma d’allotjament ho gestiona segons les seves regles de compte i privacitat. No rebem la teva contrasenya de ChatGPT.",
          ],
        },
        {
          id: "purposes",
          title: "4. Finalitats i bases jurídiques",
          paragraphs: [
            "Atenem consultes ordinàries i protegim el web pel nostre interès legítim a respondre la correspondència, mantenir la disponibilitat i evitar abusos, ponderat amb els teus drets (article 6.1.f del RGPD). Si demanes actuacions prèvies a un contracte, la correspondència necessària pot basar-se en l’article 6.1.b. Les obligacions legals, incloses sol·licituds de drets i registres exigibles, es basen en l’article 6.1.c.",
            "No venem dades personals ni utilitzem la correspondència per a perfils publicitaris. No prenem decisions automatitzades sobre tu amb efectes jurídics o d’importància similar. Una finalitat opcional que requereixi consentiment necessitaria informació i elecció pròpies; aquesta política no constitueix aquest consentiment.",
          ],
        },
        {
          id: "providers",
          title: "5. Proveïdors i destinataris",
          paragraphs: [
            "Google Workspace gestiona el correu de l’empresa, incloent-hi recepció, emmagatzematge i resposta a missatges i adjunts. El web privat actual s’allotja mitjançant OpenAI Sites, amb infraestructura de Cloudflare per distribuir-lo i protegir-lo. Els serveis d’allotjament i identitat tracten les dades de connexió o compte necessàries per a aquestes funcions. Els seus avisos expliquen els tractaments propis de compte, seguretat i obligacions legals.",
            "L’accés a la correspondència es limita a persones autoritzades per atendre-la. També es pot comunicar informació a assessors professionals o autoritats competents quan calgui per una obligació legal o reclamació. Un enllaç extern porta als serveis i a la informació de privacitat d’aquell operador.",
          ],
          links: providers,
        },
        {
          id: "transfers",
          title: "6. Tractament internacional",
          paragraphs: [
            "Els proveïdors de correu, allotjament, identitat i suport poden tractar informació fora de l’Espai Econòmic Europeu. Un domicili empresarial a la UE no garanteix un tractament exclusivament europeu. Quan una transferència requereixi garanties, el mecanisme aplicable ha de cobrir el destinatari i tractament, com una decisió d’adequació pertinent o garanties contractuals. Pots demanar-nos informació sobre el mecanisme i les garanties aplicables a les teves dades.",
          ],
        },
        {
          id: "retention",
          title: "7. Terminis de conservació",
          paragraphs: [
            "Conservem la correspondència mentre atenem la consulta i, quan calgui, durant el termini de l’obligació o reclamació aplicable. Els registres tècnics es limiten per les finalitats de distribució, diagnòstic i seguretat i els terminis aplicables de l’allotjament. Pots consultar el termini i les excepcions rellevants per a la teva sol·licitud.",
            "Quan calgui conservar dades per una obligació o reclamació, l’accés es restringeix a aquesta finalitat. Les còpies de recuperació i els registres propis legals o de seguretat del proveïdor poden caducar en altres moments; la supressió no garanteix un esborrament immediat de totes les còpies.",
          ],
        },
        {
          id: "cookies",
          title: "8. Galetes i funcions del navegador",
          paragraphs: [
            "Les pàgines corporatives no instal·len galetes de publicitat o analítica ni guarden una preferència d’idioma: l’idioma forma part de l’adreça de la pàgina. El botó per copiar el correu utilitza el porta-retalls del dispositiu només quan el prems. Obrir un enllaç de correu crea un esborrany a la teva aplicació; no envia automàticament cap missatge.",
            "La plataforma pot utilitzar emmagatzematge necessari de sessió i seguretat quan l’accés privat requereix identificació. Els seus avisos ho expliquen. Esborrar-lo des del navegador pot tancar la sessió, però no elimina correus ja enviats. Un seguiment opcional no necessari requeriria la seva informació i mecanisme de consentiment aplicables.",
          ],
        },
        {
          id: "rights",
          title: "9. Els teus drets",
          paragraphs: [
            `Segons el tractament, pots sol·licitar accés, rectificació, supressió o limitació; oposar-te als tractaments per interès legítim; i demanar portabilitat quan se’n compleixin els requisits. Si s’utilitza consentiment, pots retirar-lo sense afectar la licitud anterior. Escriu a ${email} o al domicili social. Verifiquem la identitat proporcionalment i no demanem la teva contrasenya.`,
            "Les sol·licituds són normalment gratuïtes i es responen en un mes. Si la llei permet ampliar el termini per complexitat o nombre de sol·licituds, ho expliquem dins del primer mes. Pots reclamar davant l’Agència Espanyola de Protecció de Dades (AEPD), també si no estàs d’acord amb la nostra resposta.",
          ],
          links: [
            {
              label: "Els teus drets a l’AEPD",
              href: "https://www.aepd.es/derechos-y-deberes/ejerce-tus-derechos",
            },
          ],
        },
        {
          id: "security",
          title: "10. Seguretat i actualitzacions",
          paragraphs: [
            "El web utilitza HTTPS i limitem l’accés a la correspondència empresarial. Cap servei web o de correu pot oferir una garantia absoluta de seguretat. Els límits d’edat i permisos específics consten als avisos de cada producte; no es dedueixen d’aquestes pàgines corporatives.",
            "Identifiquem les actualitzacions mitjançant la data d’aquesta política i facilitem l’avís addicional que correspongui davant d’un canvi rellevant del tractament. Les versions catalana, castellana i anglesa busquen explicar les mateixes pràctiques.",
          ],
        },
      ],
    },
    terms: {
      title: "Termes i condicions",
      intro:
        "Condicions de visita del web corporatiu de GarBar. L’ús de TaskFlow, Lucid Saga i qualsevol producte de pagament es regeix per les condicions presentades per a aquell producte.",
      updated: "En vigor des del 8 de novembre de 2026",
      contents: "En aquestes condicions",
      sections: [
        {
          id: "operator",
          title: "1. L’empresa i aquestes condicions",
          paragraphs: [
            `GarBar és la marca pública de ${company.name}, NIF ${company.taxId}, amb domicili a ${company.address}. La pàgina d’informació de l’empresa recull les dades registrals. Per a consultes o reclamacions, escriu a ${email} o al domicili social.`,
            "Aquestes condicions es refereixen a aquest web corporatiu informatiu. No substitueixen les condicions ni les polítiques de privacitat de TaskFlow o Lucid Saga. La política de privacitat explica les dades associades a visites i correspondència.",
          ],
        },
        {
          id: "access",
          title: "2. Accés i disponibilitat dels productes",
          paragraphs: [
            "Consultar aquestes pàgines és gratuït, sens perjudici dels teus costos de connexió. No gestionen un procés de compra, cobren subscripcions ni creen comptes de producte. Una versió privada pot requerir la identificació de la plataforma d’allotjament; no és una subscripció a un producte de GarBar.",
            "Llegir el web, obrir un esborrany de correu o seguir un enllaç no compra cap producte. Un anunci de proper llançament, il·lustració o descripció de desenvolupament no garanteix que una app, preu o funció prevista ja estigui disponible. Consulta el web o la fitxa de botiga actual del producte.",
          ],
        },
        {
          id: "use",
          title: "3. Ús responsable",
          paragraphs: [
            "Utilitza el web lícitament i respecta els drets d’altres persones. No hi introdueixis programari maliciós, n’alteris la disponibilitat, intentis accessos no autoritzats, suplantis l’empresa ni utilitzis el contacte per a missatges il·lícits o abusius. Es poden aplicar mesures raonables de protecció respectant els drets aplicables.",
          ],
        },
        {
          id: "property",
          title: "4. Contingut i propietat intel·lectual",
          paragraphs: [
            "Els textos, imatges, programari i elements de marca pertanyen als titulars respectius. Pots consultar les pàgines per a la seva finalitat, compartir enllaços i exercir els usos permesos per la llei. Aquestes condicions no transmeten la propietat ni permeten suplantar GarBar o aparentar-ne el suport. Es mantenen les llicències de tercers i de codi obert aplicables.",
          ],
        },
        {
          id: "products",
          title: "5. Webs de producte i enllaços externs",
          paragraphs: [
            "Les funcions, requisits d’ús, supressió de comptes, IA i condicions de compra s’expliquen al web del producte. Si s’ofereix un servei de pagament, el preu, renovació, cancel·lació i informació de consum s’han de presentar amb l’oferta; aquesta presentació corporativa no crea condicions de compra.",
            "Els altres webs i plataformes tenen les seves pròpies condicions i avisos de privacitat. Enllaçar-los no elimina les nostres obligacions legals ni limita drets imperatius.",
          ],
        },
        {
          id: "responsibility",
          title: "6. Disponibilitat i responsabilitat",
          paragraphs: [
            "Procurem mantenir correcta la informació de l’empresa i agraïm els avisos d’errors. El manteniment, fallades o incidents de seguretat poden interrompre l’accés. Responem segons la llei aplicable; no hi ha una exclusió general de responsabilitat ni una renúncia a drets imperatius de consum, privacitat o altres de protegits.",
          ],
        },
        {
          id: "law",
          title: "7. Contacte, llei i canvis",
          paragraphs: [
            `Envia consultes, reclamacions o avisos sobre aquest web a ${email}. Els atenem dins dels terminis legals aplicables. S’aplica la llei espanyola sense privar el consumidor de les proteccions imperatives del país de residència habitual quan corresponguin. La competència judicial la determina la normativa aplicable, sense imposar els tribunals de la nostra ciutat.`,
            "Els canvis s’identifiquen per la data d’eficàcia i s’apliquen cap al futur, amb l’avís legalment necessari. No eliminen drets adquirits ni modifiquen retroactivament una compra de producte ja feta. Les versions catalana, castellana i anglesa busquen expressar les mateixes condicions.",
          ],
        },
      ],
    },
  },
};
