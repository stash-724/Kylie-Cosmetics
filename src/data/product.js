import matteLipKitBare from '../assets/images/brand/matte_lip_kit_bare_800x.webp';
import vitaminCSerum from '../assets/images/products/KS_Vitamin-C-Serum_Ecomm-Pink_01_800x.webp';
import mascara from '../assets/images/products/KJC_KVMASC_23_5ml_Open_800x.webp';
import matteLiquidLipstick from '../assets/images/products/Matte Liquid Lipstick.webp';
import hydratingGelMoisturizer from '../assets/images/products/Hydrating Gel Moisturizer.webp';
import underEyeCream from '../assets/images/products/Under Eye Cream.webp';

const products = [
  {
    id: "lip-001",
    name: "Glossy Lip Balm",
    category: "LIP",
    price: 899,
    image: matteLipKitBare,
    description: "Hydrating, long-lasting, non-sticky lip balm for daily glow.",
    bestSeller: true
  },
  {
    id: "face-001",
    name: "Vitamin C Face Serum",
    category: "FACE",
    price: 1299,
    image: vitaminCSerum,
    description: "Brightens skin tone and reduces dark spots.",
    bestSeller: true
  },
  {
    id: "eye-001",
    name: "Waterproof Mascara",
    category: "EYES",
    price: 1099,
    image: mascara,
    description: "Adds volume and definition with long-lasting formula.",
    bestSeller: false
  },
  {
    id: "lip-002",
    name: "Matte Liquid Lipstick",
    category: "LIP",
    price: 999,
    image: matteLiquidLipstick,
    description: "Bold pigment, velvety finish, smudge-proof wear.",
    bestSeller: false
  },
  {
    id: "face-002",
    name: "Hydrating Gel Moisturizer",
    category: "FACE",
    price: 1399,
    image: hydratingGelMoisturizer,
    description: "Soothes and hydrates skin with a lightweight texture.",
    bestSeller: true
  },
  {
    id: "eye-002",
    name: "Under Eye Cream",
    category: "EYES",
    price: 1199,
    image: underEyeCream,
    description: "Reduces puffiness, dark circles and nourishes under-eye area.",
    bestSeller: false
  }
];

export default products;
