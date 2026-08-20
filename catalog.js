export const catalog = [
  { id:"bed-1", category:"Beds", name:"King Size Bed", price:25999, details:"With box storage • Sheesham wood" },
  { id:"bed-2", category:"Beds", name:"Queen Size Bed", price:18999, details:"With box storage • Sheesham wood" },
  { id:"bed-3", category:"Beds", name:"King Size Upholstered Bed", price:29999, details:"Hydraulic storage • Fabric & wood" },
  { id:"bed-4", category:"Beds", name:"Queen Size Bed", price:16999, details:"Box storage • Engineered wood" },
  { id:"bed-5", category:"Beds", name:"King Size Bed", price:27999, details:"Box storage • Sheesham wood" },
  { id:"bed-6", category:"Beds", name:"Queen Size Bed", price:15999, details:"Box storage • Engineered wood" },

  { id:"sofa-1", category:"Sofas", name:"L Shape Sofa", price:32999, details:"5 seater • Fabric" },
  { id:"sofa-2", category:"Sofas", name:"Sofa Set (3+2+1)", price:29999, details:"Premium fabric" },
  { id:"sofa-3", category:"Sofas", name:"L Shape Sofa", price:38999, details:"7 seater • Fabric" },
  { id:"sofa-4", category:"Sofas", name:"Sofa Set (3+2)", price:24999, details:"Premium fabric" },
  { id:"sofa-5", category:"Sofas", name:"Recliner Sofa", price:39999, details:"3 seater • Fabric" },
  { id:"sofa-6", category:"Sofas", name:"Corner Sofa", price:33999, details:"5 seater • Fabric" },

  { id:"dress-1", category:"Dressing Tables", name:"Dressing Table", price:12999, details:"Mirror & stool • Sheesham wood" },
  { id:"dress-2", category:"Dressing Tables", name:"Dressing Table", price:9999, details:"Mirror & stool • Engineered wood" },
  { id:"dress-3", category:"Dressing Tables", name:"Dressing Table", price:10999, details:"LED light • Engineered wood" },
  { id:"dress-4", category:"Dressing Tables", name:"Dressing Table", price:8999, details:"Mirror & stool • MDF" },

  { id:"chair-1", category:"Chairs", name:"Office Chair", price:4999, details:"Ergonomic • Mesh" },
  { id:"chair-2", category:"Chairs", name:"Executive Chair", price:6999, details:"High back • Leatherette" },
  { id:"chair-3", category:"Chairs", name:"Plastic Chair", price:1199, details:"Durable • Plastic" },
  { id:"chair-4", category:"Chairs", name:"Wooden Chair", price:2499, details:"Premium • Sheesham wood" },

  { id:"table-1", category:"Tables", name:"Center Table", price:5999, details:"Wooden" },
  { id:"table-2", category:"Tables", name:"Study Table", price:4999, details:"Modern design • Engineered wood" },
  { id:"table-3", category:"Tables", name:"Dining Table", price:12999, details:"4 seater • Sheesham wood" },
  { id:"table-4", category:"Tables", name:"Study Table", price:6999, details:"With drawer • Engineered wood" },

  { id:"dining-1", category:"Dining Sets", name:"Dining Set", price:24999, details:"4 seater • Sheesham wood" },
  { id:"dining-2", category:"Dining Sets", name:"Dining Set", price:29999, details:"6 seater • Sheesham wood" },
  { id:"dining-3", category:"Dining Sets", name:"Dining Set", price:34999, details:"6 seater • Marble top" },
  { id:"dining-4", category:"Dining Sets", name:"Dining Set", price:39999, details:"8 seater • Sheesham wood" },

  { id:"wardrobe-1", category:"Wardrobes & Storage", name:"2 Door Wardrobe", price:9999, details:"With mirror • Engineered wood" },
  { id:"wardrobe-2", category:"Wardrobes & Storage", name:"3 Door Wardrobe", price:17999, details:"With mirror • Engineered wood" },
  { id:"wardrobe-3", category:"Wardrobes & Storage", name:"4 Door Wardrobe", price:24999, details:"With mirror • Engineered wood" },
  { id:"wardrobe-4", category:"Wardrobes & Storage", name:"Sliding Door Wardrobe", price:27999, details:"With mirror • Engineered wood" },
  { id:"wardrobe-5", category:"Wardrobes & Storage", name:"Multi Purpose Storage Cabinet", price:7999, details:"Engineered wood" },
  { id:"wardrobe-6", category:"Wardrobes & Storage", name:"Shoe Rack", price:4999, details:"6 shelves • Engineered wood" },
  { id:"wardrobe-7", category:"Wardrobes & Storage", name:"Chest of Drawers", price:6999, details:"5 drawer • Engineered wood" },
  { id:"wardrobe-8", category:"Wardrobes & Storage", name:"TV Unit", price:7999, details:"Modern design • Engineered wood" }
];

export const categories = [...new Set(catalog.map(p => p.category))];

export function money(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}

export function findProducts(text) {
  const q = text.toLowerCase();

  const aliases = {
    bed:["bed","बेड","पलंग"],
    sofa:["sofa","सोफा","couch"],
    dressing:["dressing","ड्रेसिंग","ड्रेसिंग टेबल"],
    chair:["chair","चेयर","कुर्सी"],
    table:["table","टेबल","मेज"],
    dining:["dining","डाइनिंग","dining set"],
    wardrobe:["wardrobe","अलमारी","almirah","storage","रैक","rack"]
  };

  const key = Object.entries(aliases)
    .find(([, words]) => words.some(w => q.includes(w)))?.[0];

  if (!key) return catalog.slice(0, 6);

  return catalog.filter(p => {
    const s = `${p.category} ${p.name} ${p.details}`.toLowerCase();
    return aliases[key].some(w => s.includes(w));
  });
}
