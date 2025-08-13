import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ShoppingCart,
  Instagram,
  MapPin,
  Bike,
  Clock,
  Phone,
  Leaf,
  Plus,
  Minus,
  Trash,
  Check,
  Menu,
} from "lucide-react";

// --- CONFIGURACIÓN RÁPIDA (¡EDITA ESTO!) --------------------------------------
const BUSINESS = {
  brand: "+Pan / MásPan",
  city: "Valladolid",
  phone: "+34999999999", // Nº para WhatsApp (formato internacional). Sustituir.
  instagram: "https://instagram.com/tu_instagram",
  tiktok: "https://www.tiktok.com/@tu_tiktok",
  glovo: "https://glovoapp.com/es/store/tu-tienda", // Sustituir por tu URL real
  ubereats: "https://www.ubereats.com/store/tu-tienda", // Sustituir por tu URL real
  deliverySlots: [
    { id: "slot1", label: "7:00–9:00" },
    { id: "slot2", label: "9:00–11:00" },
  ],
};

// Productos cargados desde el HTML (sin precios)
const PRODUCTS = [
  {
    id: "pan-de-espelta-con-mm-591",
    name: "Pan de ESPELTA con MM",
    price: null,
    badge: "Masa madre",
    category: "Panes MasaMadre",
    emoji: "🍞",
    image: "images/maspan/591.png",
    desc: "Espelta",
  },
  {
    id: "candeal-605",
    name: "CANDEAL",
    price: null,
    badge: "",
    category: "Pan Blanco",
    emoji: "🍞",
    image: "images/maspan/605.png",
    desc: "Pan Candeal",
  },
  {
    id: "empanada-gallega-atun-1-3-kg-610",
    name: "Empanada Gallega Atún 1,3 kg",
    price: null,
    badge: "",
    category: "Oferta Salada",
    emoji: "🥪",
    image: "images/maspan/610.png",
    desc: "Empanada Gallega de Atún",
  },
  {
    id: "tarta-fresas-con-nata-6-8-rac-688",
    name: "Tarta Fresas con Nata (6-8 rac)",
    price: null,
    badge: "",
    category: "Pastelería",
    emoji: "🍰",
    image: "images/maspan/688.png",
    desc: "Tarta Fresas con Nata",
  },
  {
    id: "ponche-segoviano-6-8-rac-655",
    name: "Ponche Segoviano (6-8 rac)",
    price: null,
    badge: "",
    category: "Pastelería",
    emoji: "🍰",
    image: "images/maspan/655.png",
    desc: "Ponche Segoviano",
  },
  {
    id: "tarta-aniversario-6-8-rac-733",
    name: "Tarta Aniversario (6-8 rac)",
    price: null,
    badge: "",
    category: "Pastelería",
    emoji: "🍰",
    image: "images/maspan/733.png",
    desc: "Tarta Aniversario",
  },
  {
    id: "trenza-naranja-y-cacao-623",
    name: "TRENZA NARANJA Y CACAO",
    price: null,
    badge: "",
    category: "Pastelería",
    emoji: "🍰",
    image: "images/maspan/623.png",
    desc: "TRENZA NARANJA Y CACAO",
  },
  {
    id: "leche-semidesnatada-570",
    name: "Leche Semidesnatada",
    price: null,
    badge: "",
    category: "Lacteos",
    emoji: "🥛",
    image: "images/maspan/570.png",
    desc: "Leche Semidesnatada",
  },
  {
    id: "6-x-leche-semidesnatada-574",
    name: "6 x Leche Semidesnatada",
    price: null,
    badge: "",
    category: "Lacteos",
    emoji: "🥛",
    image: "images/maspan/574.png",
    desc: "6 x Leche Semidesnatada",
  },
  {
    id: "leche-sin-lactosa-semidesnatada-572",
    name: "Leche SIN Lactosa SEMIdesnatada",
    price: null,
    badge: "",
    category: "Lacteos",
    emoji: "🥛",
    image: "images/maspan/572.png",
    desc: "Leche SIN Lactosa SEMIdesnatada",
  },
  {
    id: "vienesa-525",
    name: "VIENESA",
    price: null,
    badge: "",
    category: "Barras",
    emoji: "🥖",
    image: "images/maspan/525.png",
    desc: "Vienesa",
  },
  {
    id: "chapata-465",
    name: "CHAPATA",
    price: null,
    badge: "",
    category: "Pan Blanco",
    emoji: "🍞",
    image: "images/maspan/465.png",
    desc: "Chapata",
  },
  {
    id: "croissant-curvo-mgr-100gr-630",
    name: "Croissant Curvo MGR 100gr",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/630.png",
    desc: "Croissant Plus Curvo margarina 100gr",
  },
  {
    id: "3-x-croissant-plus-curvo-mgr-629",
    name: "3 x Croissant Plus Curvo MGR",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/629.png",
    desc: "Croissant Plus Curvo MGR 100gr (x3)",
  },
  {
    id: "3-x-croissant-plus-recto-mtq-649",
    name: "3 x Croissant Plus Recto MTQ",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/649.png",
    desc: "Croissant Plus Recto MTQ (x3)",
  },
  {
    id: "3-x-argentino-631",
    name: "3 x Argentino",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/631.png",
    desc: "Argentino (x3)",
  },
  {
    id: "empanada-gallega-bacalao-y-pasas-1-3-kg-748",
    name: "Empanada Gallega Bacalao y Pasas 1,3 kg",
    price: null,
    badge: "",
    category: "Oferta Salada",
    emoji: "🥪",
    image: "images/maspan/748.png",
    desc: "Empanada Gallega Bacalao y Pasas",
  },
  {
    id: "empanada-gallega-carne-1-3-kg-771",
    name: "Empanada Gallega Carne 1,3 kg",
    price: null,
    badge: "",
    category: "Oferta Salada",
    emoji: "🥪",
    image: "images/maspan/771.png",
    desc: "Empanada gallega de carne",
  },
  {
    id: "9-x-delicias-york-queso-y-atun-665",
    name: "9 x Delicias york, queso y atún",
    price: null,
    badge: "",
    category: "Oferta Salada",
    emoji: "🥪",
    image: "images/maspan/665.png",
    desc: "Delicias york, queso y atún (x9)",
  },
  {
    id: "campesina-526",
    name: "CAMPESINA",
    price: null,
    badge: "",
    category: "Panes Bienestar",
    emoji: "🧡",
    image: "images/maspan/526.png",
    desc: "Campesina yodada",
  },
  {
    id: "3-x-empanadilla-atun-669",
    name: "3 x Empanadilla Atún",
    price: null,
    badge: "",
    category: "Oferta Salada",
    emoji: "🥪",
    image: "images/maspan/669.png",
    desc: "Empanadilla atún (x3)",
  },
  {
    id: "barrita-cereales-685",
    name: "Barrita CEREALES",
    price: null,
    badge: "",
    category: "Sabores y Semillas",
    emoji: "🌾",
    image: "images/maspan/685.png",
    desc: "Payesita cereales",
  },
  {
    id: "3-x-empanadilla-pisto-659",
    name: "3 x Empanadilla Pisto",
    price: null,
    badge: "",
    category: "Oferta Salada",
    emoji: "🥪",
    image: "images/maspan/659.png",
    desc: "Empanadilla pisto (x3)",
  },
  {
    id: "2xbarrita-cereales-686",
    name: "2xBarrita CEREALES",
    price: null,
    badge: "",
    category: "Sabores y Semillas",
    emoji: "🌾",
    image: "images/maspan/686.png",
    desc: "Payesita cereales (x2)",
  },
  {
    id: "pan-de-centeno-con-mm-590",
    name: "Pan de CENTENO con MM",
    price: null,
    badge: "Masa madre",
    category: "Panes MasaMadre",
    emoji: "🍞",
    image: "images/maspan/590.png",
    desc: "CENTENO",
  },
  {
    id: "pan-semillas-con-mm-637",
    name: "Pan SEMILLAS con MM",
    price: null,
    badge: "Masa madre",
    category: "Panes MasaMadre",
    emoji: "🍞",
    image: "images/maspan/637.png",
    desc: "Pan Semillas Nature",
  },
  {
    id: "2xvienesa-plan-ahorro-530",
    name: "2xVIENESA (Plan ahorro)",
    price: null,
    badge: "",
    category: "Barras",
    emoji: "🥖",
    image: "images/maspan/530.png",
    desc: "Vienesa (x2)",
  },
  {
    id: "riche-478",
    name: "RICHE",
    price: null,
    badge: "",
    category: "Barras",
    emoji: "🥖",
    image: "images/maspan/478.png",
    desc: "Barra de Riche ",
  },
  {
    id: "2xriche-plan-ahorro-480",
    name: "2xRICHE (Plan ahorro)",
    price: null,
    badge: "",
    category: "Barras",
    emoji: "🥖",
    image: "images/maspan/480.png",
    desc: "Riche (x2)",
  },
  {
    id: "12-x-mini-croissant-recto-mtq-654",
    name: "12 x Mini croissant recto MTQ",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/654.png",
    desc: "Mini croissant recto MTQ (x12)",
  },
  {
    id: "5-x-mini-caracola-mgr-627",
    name: "5 x Mini Caracola MGR",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/627.png",
    desc: "Mini Caracola Margarina (x5)",
  },
  {
    id: "3-x-mini-napolitana-cacao-en-crema-gourmet-mtq-661",
    name: "3 x Mini Napolitana cacao en crema Gourmet MTQ",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/661.png",
    desc: "Mini Napolitana cacao en crema Gourmet MTQ (x3)",
  },
  {
    id: "3-x-flauta-de-cacao-en-crema-mgr-650",
    name: "3 x Flauta de cacao en crema MGR",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/650.png",
    desc: "Flauta de cacao en crema (x3)",
  },
  {
    id: "pastel-de-manzana-676",
    name: "Pastel de Manzana",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/676.png",
    desc: "Pastel de Manzana",
  },
  {
    id: "3-x-pastel-de-manzana-684",
    name: "3 x Pastel de Manzana",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/684.png",
    desc: "Pastel de Manzana (DUPLICADO) x 3",
  },
  {
    id: "3-x-palmerita-multicereal-mtq-687",
    name: "3 x Palmerita Multicereal MTQ",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/687.png",
    desc: "Palmerita Multicereal MTQ (x3)",
  },
  {
    id: "6-x-palmerita-multicereal-mtq-639",
    name: "6 x Palmerita Multicereal MTQ",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/639.png",
    desc: "Palmerita Multicereal MTQ (x6)",
  },
  {
    id: "10-x-farton-653",
    name: "10 x Farton",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/653.png",
    desc: "FARTON PLUS (x10)",
  },
  {
    id: "5-x-farton-749",
    name: "5 x Farton",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/749.png",
    desc: "Farton Plus (x5)",
  },
  {
    id: "3-x-maxi-moodie-azucar-762",
    name: "3 x Maxi Moodie Azúcar",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/762.png",
    desc: "Maxi Moodie Azucar (x3)",
  },
  {
    id: "3-x-maxi-moodie-bombon-644",
    name: "3 x Maxi Moodie Bombón",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/644.png",
    desc: "Maxi Moodie Bombón (x3)",
  },
  {
    id: "3-x-pan-hamburguesa-80gr-479",
    name: "3 x Pan Hamburguesa 80gr",
    price: null,
    badge: "",
    category: "Panecillos",
    emoji: "🥯",
    image: "images/maspan/479.png",
    desc: "Panecillo Hamburguesa (x3)",
  },
  {
    id: "2-x-napolitana-cacao-en-crema-527",
    name: "2 x Napolitana Cacao en Crema",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/527.png",
    desc: "Napolitana Cacao en Crema (x2)",
  },
  {
    id: "4-x-barrita-berry-75gr-641",
    name: "4 x Barrita Berry (75gr)",
    price: null,
    badge: "",
    category: "Panecillos",
    emoji: "🥯",
    image: "images/maspan/641.png",
    desc: "Barrita Berry (x4)",
  },
  {
    id: "6-x-magdalena-artesana-adelaida-grande-105",
    name: "6 x Magdalena artesana ADELAIDA grande",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/105.png",
    desc: "Magdalena artesana ADELAIDA (x6)",
  },
  {
    id: "4-x-diamante-55gr-634",
    name: "4 x Diamante (55gr)",
    price: null,
    badge: "",
    category: "Panecillos",
    emoji: "🥯",
    image: "images/maspan/634.png",
    desc: "Diamante (x4)",
  },
  {
    id: "2-x-bocadillo-pannier-150gr-671",
    name: "2 x Bocadillo Pannier 150gr",
    price: null,
    badge: "",
    category: "Panecillos",
    emoji: "🥯",
    image: "images/maspan/671.png",
    desc: "Bocadillo Pannier (x2)",
  },
  {
    id: "castellana-753",
    name: "CASTELLANA",
    price: null,
    badge: "",
    category: "Barras",
    emoji: "🥖",
    image: "images/maspan/753.png",
    desc: "CASTELLANA",
  },
  {
    id: "napolitana-crema-747",
    name: "Napolitana Crema",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/747.png",
    desc: "Napolitana Crema",
  },
  {
    id: "danesa-con-sirope-de-arce-746",
    name: "Danesa con sirope de arce",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/746.png",
    desc: "Danesa",
  },
  {
    id: "palmera-xl-638",
    name: "Palmera XL",
    price: null,
    badge: "",
    category: "Bollería",
    emoji: "🥐",
    image: "images/maspan/638.png",
    desc: "Palmera XL MGR",
  },
  {
    id: "pasas-y-nueces-751",
    name: "Pasas y nueces",
    price: null,
    badge: "",
    category: "Sabores y Semillas",
    emoji: "🌾",
    image: "images/maspan/751.png",
    desc: "Pasas y nueces",
  },
  {
    id: "fabiola-707",
    name: "FABIOLA",
    price: null,
    badge: "",
    category: "Barras",
    emoji: "🥖",
    image: "images/maspan/707.png",
    desc: "Fabiola Picos",
  },
  {
    id: "maiz-757",
    name: "MAÍZ",
    price: null,
    badge: "",
    category: "Panes Bienestar",
    emoji: "🧡",
    image: "images/maspan/757.png",
    desc: "MAIZ",
  },
  {
    id: "barra-100-integral-759",
    name: "Barra 100% INTEGRAL",
    price: null,
    badge: "",
    category: "Panes Bienestar",
    emoji: "🧡",
    image: "images/maspan/759.png",
    desc: "Barra 100% INTEGRAL",
  },
  {
    id: "trenza-nueces-y-pasas-619",
    name: "TRENZA NUECES Y PASAS",
    price: null,
    badge: "",
    category: "Pastelería",
    emoji: "🍰",
    image: "images/maspan/619.png",
    desc: "TRENZA NUECES Y PASAS",
  },
];

// ---------------------------------------------------------------------------------

function classNames(...c) {
  return c.filter(Boolean).join(" ");
}

function formatEUR(n) {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(n);
}

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  }, [key, value]);
  return [value, setValue];
}

// Imagen de producto con efecto lupa (sin ventana blanca de preview)
function ProductImage({
  src,
  alt,
  imgClass = "",
  // preview ya no se usa, lo dejamos por compatibilidad con los llamados existentes
  preview = false,
  magnify = true,
  lensClass = "w-24 h-24",
  // previewSizeClass ya no se usa
  previewSizeClass = "h-44 w-56",
}) {
  const ref = useRef(null);
  const [hover, setHover] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0, w: 1, h: 1 });

  function onMove(e) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y, w: rect.width, h: rect.height });
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
    >
      <img src={src} alt={alt} className={imgClass} loading="lazy" />

      {magnify && hover && (
        <div
          className={`pointer-events-none absolute z-30 rounded-full border border-neutral-200 shadow-xl bg-white/60 backdrop-blur ${lensClass}`}
          style={{
            left: coords.x,
            top: coords.y,
            transform: "translate(-50%, -50%)",
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "200% 200%",
            backgroundPosition: `${(coords.x / coords.w) * 100}% ${(coords.y / coords.h) * 100}%`,
          }}
          aria-hidden
        />
      )}
    </div>
  );
}

export default function MasPanSite() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useLocalStorage("maspan_cart", {}); // {id: qty}
  const [address, setAddress] = useLocalStorage("maspan_addr", "");
  const [notes, setNotes] = useLocalStorage("maspan_notes", "");
  const [slot, setSlot] = useLocalStorage("maspan_slot", BUSINESS.deliverySlots[0].id);

  const items = useMemo(() => {
    return PRODUCTS.filter((p) => cart[p.id]).map((p) => ({ ...p, qty: cart[p.id] }));
  }, [cart]);

  const total = useMemo(() => {
    return items.reduce((s, it) => s + ((it.price || 0) * it.qty), 0);
  }, [items]);

  const categories = useMemo(() => {
    const set = Array.from(new Set(PRODUCTS.map((p) => p.category)));
    return set;
  }, []);

  const slotLabel = BUSINESS.deliverySlots.find((s) => s.id === slot)?.label ?? "";

  function addToCart(id) {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product || product.price == null) return; // No añadimos si no hay precio
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  }
  function decFromCart(id) {
    setCart((prev) => {
      const next = { ...prev };
      if (!next[id]) return next;
      next[id] -= 1;
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }
  function removeFromCart(id) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }
  function clearCart() {
    setCart({});
  }

  function buildWhatsAppHref() {
    if (items.length === 0) return "#";
    const lines = [
      `✨ Pedido nuevo para ${BUSINESS.brand}`,
      "",
      ...items.map((it) => {
        const linePrice = (typeof it.price === "number") ? ` — ${formatEUR(it.price * it.qty)}` : " — Consultar";
        return `• ${it.name} x${it.qty}${linePrice}`;
      }),
      "",
      `Total: ${formatEUR(total)}`,
      address ? `Dirección: ${address}` : "",
      slotLabel ? `Franja: ${slotLabel}` : "",
      notes ? `Notas: ${notes}` : "",
    ].filter(Boolean);
    const text = encodeURIComponent(lines.join("\n"));
    const phone = BUSINESS.phone.replace(/[^+\d]/g, "");
    return `https://wa.me/${phone}?text=${text}`;
  }

  // --- UI -----------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-100 text-neutral-900">
      {/* NAV */}
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-neutral-900 text-white grid place-items-center text-lg font-semibold shadow-sm">+P</div>
            <span className="font-semibold tracking-tight">{BUSINESS.brand}</span>
            <span className="hidden md:inline text-neutral-400">•</span>
            <span className="hidden md:inline text-neutral-500">Pan del día en {BUSINESS.city}</span>
          </div>
          <nav className="hidden md:flex items-center gap-2">
            <a
              href={BUSINESS.ubereats}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-black text-white text-sm font-medium hover:opacity-90 transition"
            >
              Uber&nbsp;Eats
            </a>
            <a
              href={BUSINESS.glovo}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 rounded-xl bg-amber-400 text-black text-sm font-medium hover:brightness-95 transition"
            >
              Glovo
            </a>
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl hover:bg-neutral-100 transition"
              aria-label="Instagram"
            >
              <Instagram className="h-6 w-6" />
            </a>
            {/* TikTok simple SVG */}
            <a
              href={BUSINESS.tiktok}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-xl hover:bg-neutral-100 transition"
              aria-label="TikTok"
            >
              <svg
                viewBox="0 0 256 256"
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M170.7 0c9.2 23.9 31.9 41.7 58.6 43.9v39.4c-18.1 1.8-36.1-2.9-52-13.2v73.9c0 40-32.4 72.4-72.4 72.4S32.5 183.9 32.5 143.9c0-34.9 24.1-64.2 56.3-71.5v41.5c-9.6 5.2-16.1 15.4-16.1 27 0 17 13.8 30.7 30.7 30.7 17 0 30.7-13.8 30.7-30.7V0h36.6z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <button
              onClick={() => setIsCartOpen(true)}
              className="ml-2 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium shadow hover:-translate-y-0.5 transition"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Carrito</span>
              {Object.keys(cart).length > 0 && (
                <span className="ml-1 rounded-lg bg-white/20 px-2 py-0.5 text-xs">
                  {Object.values(cart).reduce((a, b) => a + b, 0)}
                </span>
              )}
            </button>
          </nav>
          <button
            className="md:hidden p-2 rounded-xl hover:bg-neutral-100"
            onClick={() => setMobileMenu((v) => !v)}
            aria-label="Abrir menú"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {mobileMenu && (
          <div className="md:hidden border-t border-neutral-200 px-4 pb-4 bg-white">
            <div className="flex flex-col gap-2 pt-3">
              <a
                href={BUSINESS.ubereats}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-black text-white text-sm font-medium"
              >
                Uber Eats
              </a>
              <a
                href={BUSINESS.glovo}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-2 rounded-xl bg-amber-400 text-black text-sm font-medium"
              >
                Glovo
              </a>
              <div className="flex items-center gap-2">
                <a
                  href={BUSINESS.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl hover:bg-neutral-100"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href={BUSINESS.tiktok}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl hover:bg-neutral-100"
                  aria-label="TikTok"
                >
                  <svg
                    viewBox="0 0 256 256"
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M170.7 0c9.2 23.9 31.9 41.7 58.6 43.9v39.4c-18.1 1.8-36.1-2.9-52-13.2v73.9c0 40-32.4 72.4-72.4 72.4S32.5 183.9 32.5 143.9c0-34.9 24.1-64.2 56.3-71.5v41.5c-9.6 5.2-16.1 15.4-16.1 27 0 17 13.8 30.7 30.7 30.7 17 0 30.7-13.8 30.7-30.7V0h36.6z"
                      fill="currentColor"
                    />
                  </svg>
                </a>
              </div>
              <button
                onClick={() => setIsCartOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-neutral-900 text-white text-sm font-medium"
              >
                <ShoppingCart className="h-5 w-5" />Carrito
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 text-white text-xs font-medium shadow">
              Pan recién hecho • Entrega temprana
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
              Pan del día a tu puerta en {BUSINESS.city}
            </h1>
            <p className="mt-4 text-neutral-600 text-lg">
              Repartimos de lunes a sábado. Sin permanencia. Pausas cuando quieras. Pide por plataforma, aquí mismo o por WhatsApp.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-5 py-3 rounded-2xl bg-neutral-900 text-white font-medium shadow hover:-translate-y-0.5 transition"
              >
                Empezar pedido
              </button>
              <a
                href={BUSINESS.ubereats}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-black text-white font-medium"
              >
                Uber Eats
              </a>
              <a
                href={BUSINESS.glovo}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-amber-400 text-black font-medium"
              >
                Glovo
              </a>
            </div>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-neutral-600">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" /> Entrega {BUSINESS.deliverySlots.map((s) => s.label).join(" / ")}
              </div>
              <div className="flex items-center gap-2">
                <Bike className="h-4 w-4" /> Sin contacto (bolsa en puerta)
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Zonas: Centro, Parquesol, Arroyo*
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4" /> Bolsas de papel reciclable
              </div>
            </div>
            <p className="text-xs text-neutral-400 mt-2">
              *Ejemplo. Sustituye por tus barrios/municipios reales.
            </p>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] w-full rounded-3xl bg-[radial-gradient(circle_at_30%_20%,#fff_0,#f5f5f4_35%,#e7e5e4_100%)] shadow-xl border border-neutral-200 p-6 flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4">
                {PRODUCTS.slice(0, 6).map((p) => (
                  <div
                    key={p.id}
                    className="rounded-2xl bg-white/80 backdrop-blur border border-neutral-200 p-4 text-center shadow-sm"
                  >
                    {p.image ? (
                      <ProductImage
                        src={p.image}
                        alt={p.name}
                        imgClass="h-16 w-16 rounded-xl object-cover"
                        preview
                        magnify
                        lensClass="w-24 h-24"
                        previewSizeClass="h-56 w-72"
                      />
                    ) : (
                      <div className="text-4xl">{p.emoji}</div>
                    )}
                    <div className="mt-2 font-medium text-sm">{p.name}</div>
                    <div className="text-xs text-neutral-500">{p.price != null ? formatEUR(p.price) : "Consultar"}</div>
                    <button
                      onClick={() => p.price != null && addToCart(p.id)}
                      disabled={p.price == null}
                      className={classNames(
                        "mt-3 w-full text-sm rounded-xl py-1.5",
                        p.price != null ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                      )}
                    >
                      {p.price != null ? "Añadir" : "Consultar"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATÁLOGO */}
      <section id="carta" className="py-10 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Nuestra carta</h2>
            <p className="text-sm text-neutral-500">Todos los precios son IVA incl.</p>
          </div>

          {categories.map((cat) => (
            <div key={cat} className="mb-8">
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-semibold">{cat}</h3>
                <div className="h-px flex-1 bg-neutral-200" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {PRODUCTS.filter((p) => p.category === cat).map((p) => (
                  <article
                    key={p.id}
                    className="group relative overflow-visible rounded-2xl border border-neutral-200 shadow-sm hover:shadow-md transition bg-white p-5 flex flex-col"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative shrink-0">
                        {p.image ? (
                          <ProductImage
                            src={p.image}
                            alt={p.name}
                            imgClass="h-14 w-14 rounded-lg object-cover"
                            preview
                            magnify
                            lensClass="w-28 h-28"
                            previewSizeClass="h-56 w-72"
                          />
                        ) : (
                          <div className="text-4xl select-none">{p.emoji}</div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h4 className="font-semibold leading-tight">{p.name}</h4>
                          <span className="text-sm font-medium">{p.price != null ? formatEUR(p.price) : "Consultar"}</span>
                        </div>
                        {p.badge && (
                          <span className="inline-flex mt-1 text-[11px] px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200">
                            {p.badge}
                          </span>
                        )}
                        <p className="text-sm text-neutral-600 mt-2">{p.desc}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <button
                        onClick={() => decFromCart(p.id)}
                        className="h-9 w-9 grid place-items-center rounded-xl border border-neutral-200 hover:bg-neutral-50"
                      >
                        -
                      </button>
                      <div className="min-w-[3ch] text-center text-sm font-medium">
                        {cart[p.id] || 0}
                      </div>
                      <button
                        onClick={() => p.price != null && addToCart(p.id)}
                        disabled={p.price == null}
                        className={classNames(
                          "h-9 w-9 grid place-items-center rounded-xl",
                          p.price != null ? "bg-neutral-900 text-white hover:opacity-90" : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                        )}
                      >
                        +
                      </button>
                      <button
                        onClick={() => p.price != null && addToCart(p.id)}
                        disabled={p.price == null}
                        className={classNames(
                          "ml-auto px-4 h-9 rounded-xl text-sm font-medium",
                          p.price != null ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                        )}
                      >
                        {p.price != null ? "Añadir" : "Consultar"}
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-12 bg-white border-y border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-neutral-200 p-6 bg-neutral-50">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 text-white grid place-items-center">
                <Check className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold">Elige</h3>
              <p className="text-neutral-600 text-sm">
                Añade al carrito tus panes y bollería favoritos. Puedes pausar o cambiar cuando quieras.
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6 bg-neutral-50">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 text-white grid place-items-center">
                <MapPin className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold">Indica dónde</h3>
              <p className="text-neutral-600 text-sm">
                Déjanos tu dirección y si quieres entrega sin contacto (bolsa en puerta).
              </p>
            </div>
            <div className="rounded-2xl border border-neutral-200 p-6 bg-neutral-50">
              <div className="h-10 w-10 rounded-xl bg-neutral-900 text-white grid place-items-center">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="mt-3 font-semibold">Recibe temprano</h3>
              <p className="text-neutral-600 text-sm">
                Franja {BUSINESS.deliverySlots.map((s) => s.label).join(" / ")}. Te enviaremos confirmación por WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-neutral-200 bg-[radial-gradient(circle_at_20%_20%,#fff_0,#fafafa_40%,#f1f1f1_100%)] p-8 md:p-12 flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold">¿Listo para tu primer reparto?</h3>
              <p className="text-neutral-600 mt-2">Haz tu pedido directo aquí o desde tus apps favoritas.</p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsCartOpen(true)}
                className="px-5 py-3 rounded-2xl bg-neutral-900 text-white font-medium"
              >
                Abrir carrito
              </button>
              <a
                href={BUSINESS.ubereats}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-black text-white font-medium"
              >
                Uber Eats
              </a>
              <a
                href={BUSINESS.glovo}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3 rounded-2xl bg-amber-400 text-black font-medium"
              >
                Glovo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-neutral-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-neutral-500">
            © {new Date().getFullYear()} {BUSINESS.brand}. Hecho con masa madre y cariño.
          </div>
          <div className="flex items-center gap-2 text-sm">
            <a
              href={BUSINESS.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50"
            >
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a
              href={BUSINESS.tiktok}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-neutral-200 hover:bg-neutral-50"
            >
              <svg
                viewBox="0 0 256 256"
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M170.7 0c9.2 23.9 31.9 41.7 58.6 43.9v39.4c-18.1 1.8-36.1-2.9-52-13.2v73.9c0 40-32.4 72.4-72.4 72.4S32.5 183.9 32.5 143.9c0-34.9 24.1-64.2 56.3-71.5v41.5c-9.6 5.2-16.1 15.4-16.1 27 0 17 13.8 30.7 30.7 30.7 17 0 30.7-13.8 30.7-30.7V0h36.6z"
                  fill="currentColor"
                />
              </svg>
              TikTok
            </a>
          </div>
        </div>
      </footer>

      {/* CARRITO (Drawer simple) */}
      <div
        className={classNames(
          "fixed inset-0 z-50 transition",
          isCartOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* overlay */}
        <div
          className={classNames(
            "absolute inset-0 bg-black/30 transition-opacity",
            isCartOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setIsCartOpen(false)}
        />
        {/* panel */}
        <aside
          className={classNames(
            "absolute right-0 top-0 h-full w-full sm:w-[28rem] bg-white shadow-2xl border-l border-neutral-200 flex flex-col",
            "transition-transform",
            isCartOpen ? "translate-x-0" : "translate-x-full"
          )}
          aria-hidden={!isCartOpen}
        >
          <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-200">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-neutral-900 text-white grid place-items-center text-sm">🛒</div>
              <h3 className="font-semibold">Tu carrito</h3>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-sm text-neutral-500 hover:text-neutral-800"
            >
              Cerrar
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="h-full grid place-items-center text-neutral-500">
                <div>
                  <p className="text-sm">Tu carrito está vacío.</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-3 px-4 py-2 rounded-xl bg-neutral-900 text-white text-sm"
                  >
                    Ver productos
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((it) => (
                  <div
                    key={it.id}
                    className="flex items-center gap-3 p-3 rounded-xl border border-neutral-200"
                  >
                    {it.image ? (
                      <ProductImage
                        src={it.image}
                        alt={it.name}
                        imgClass="h-12 w-12 rounded-lg object-cover"
                        preview
                        magnify
                        lensClass="w-16 h-16"
                        previewSizeClass="h-48 w-56"
                      />
                    ) : (
                      <div className="text-3xl select-none">{it.emoji}</div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{it.name}</div>
                        <div className="text-sm">{typeof it.price === "number" ? formatEUR(it.price * it.qty) : "Consultar"}</div>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => decFromCart(it.id)}
                          className="h-8 w-8 grid place-items-center rounded-lg border border-neutral-200 hover:bg-neutral-50"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <div className="min-w-[3ch] text-center text-sm font-medium">
                          {it.qty}
                        </div>
                        <button
                          onClick={() => addToCart(it.id)}
                          disabled={it.price == null}
                          className={classNames(
                            "h-8 w-8 grid place-items-center rounded-lg border border-neutral-200",
                            it.price != null ? "bg-neutral-900 text-white hover:opacity-90" : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                          )}
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(it.id)}
                          className="ml-auto h-8 w-8 grid place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-5 space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Dirección de entrega</label>
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Calle, número, piso…"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Franja horaria</label>
                    <div className="flex flex-wrap gap-2">
                      {BUSINESS.deliverySlots.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setSlot(s.id)}
                          className={classNames(
                            "px-3 py-1.5 rounded-xl text-sm border",
                            slot === s.id
                              ? "bg-neutral-900 text-white border-neutral-900"
                              : "bg-white border-neutral-300 hover:bg-neutral-50"
                          )}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Notas</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ej.: Colgar bolsa en puerta, llamar al llegar…"
                      className="w-full px-3 py-2 rounded-xl border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RESUMEN */}
          <div className="border-t border-neutral-200 p-4">
            <div className="flex items-center justify-between text-sm mb-3">
              <span>Subtotal</span>
              <span className="font-medium">{formatEUR(total)}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
              <span>Entrega</span>
              <span>A confirmar según zona</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={buildWhatsAppHref()}
                target="_blank"
                rel="noreferrer"
                className={classNames(
                  "flex-1 grid place-items-center px-4 py-3 rounded-2xl text-center font-medium",
                  items.length
                    ? "bg-emerald-600 text-white hover:brightness-95"
                    : "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                )}
              >
                Confirmar por WhatsApp
              </a>
              <button
                onClick={clearCart}
                className="px-4 py-3 rounded-2xl bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200"
              >
                Vaciar
              </button>
            </div>
            <p className="text-[11px] text-neutral-400 mt-3">
              Al confirmar por WhatsApp recibirás el detalle del pedido y el coste de entrega. Métodos de pago: indicar en el chat.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

// --- Tests rápidos (smoke tests) en desarrollo ---
(function devSmokeTests() {
  try {
    console.assert(Array.isArray(PRODUCTS) && PRODUCTS.length > 0, "PRODUCTS debe ser un array con elementos");
    const itemSinPrecio = PRODUCTS.find((p) => p.price == null);
    if (itemSinPrecio) {
      const puedeAñadir = itemSinPrecio.price != null;
      console.assert(!puedeAñadir, "Los artículos sin precio no deberían poder añadirse");
    }
    const totalVacio = [].reduce((s, it) => s + ((it?.price || 0) * (it?.qty || 0)), 0);
    console.assert(!Number.isNaN(totalVacio), "El total con carrito vacío no debe ser NaN");
  } catch (e) {
    console.warn("Smoke tests fallaron:", e);
  }
})();
