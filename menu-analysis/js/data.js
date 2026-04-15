// ============================================================
//  INDUSTRY STANDARD — Jefferson County Menu Analysis Data
// ============================================================

const DATA = {
  meta: {
    title: "Jefferson County Jail",
    subtitle: "Vendor Price Comparison & Menu Analysis",
    prepared: "April 11, 2026",
    sources: [
      "PFG Invoice #6776963 (04/07/26)",
      "Shaver ISP Price List (03/01/26–03/31/26)"
    ],
    preparedBy: "Industry Standard"
  },

  stats: [
    { label: "Est. Monthly Savings", value: "$1,146+", icon: "fa-piggy-bank", color: "success", note: "By switching key items to Shaver" },
    { label: "Items: Switch to Shaver", value: "23", icon: "fa-arrows-rotate", color: "danger", note: "Shaver is cheaper" },
    { label: "Items: Keep with PFG", value: "6", icon: "fa-shield-check", color: "accent", note: "PFG wins on price" },
    { label: "New Items Available", value: "18+", icon: "fa-circle-plus", color: "warning", note: "From Shaver catalog" }
  ],

  switchToShaver: [
    { item: "Grape Drink Mix 1000/1gm",      pfgPrice: 49.95,  pfgUnit: "1000/1gm",   shaverPrice: 20.63, shaverUnit: "1000/1gm",   savings: 29.32, priority: "high" },
    { item: "Great Northern Beans Dry",       pfgPrice: 56.05,  pfgUnit: "50 LB",      shaverPrice: 39.00, shaverUnit: "50 LB",       savings: 17.05, priority: "high" },
    { item: "Jelly Assorted 200ct",           pfgPrice: 19.20,  pfgUnit: "200/.5oz",   shaverPrice: 9.53,  shaverUnit: "200 LC",      savings: 9.67,  priority: "high" },
    { item: "Rotini Pasta",                   pfgPrice: 23.83,  pfgUnit: "2/10 LB",    shaverPrice: 13.73, shaverUnit: "2/10 LB",     savings: 10.10, priority: "high" },
    { item: "Carrots Sliced Frozen",          pfgPrice: 22.43,  pfgUnit: "20 LB",      shaverPrice: 14.34, shaverUnit: "20 LB",       savings: 8.09,  priority: "high" },
    { item: "Ziti Pasta",                     pfgPrice: 21.77,  pfgUnit: "2/10 LB",    shaverPrice: 13.73, shaverUnit: "2/10 LB",     savings: 8.04,  priority: "high" },
    { item: "Onion Powder",                   pfgPrice: 32.26,  pfgUnit: "5 LB",       shaverPrice: 24.64, shaverUnit: "6/1 LB",      savings: null,  priority: "med", note: "Saves $2.35/lb — PFG 5 LB vs Shaver 6 LB" },
    { item: "Potato Flakes Dehydrated",       pfgPrice: 59.35,  pfgUnit: "40 LB",      shaverPrice: 51.62, shaverUnit: "40 LB",       savings: 7.73,  priority: "med"  },
    { item: "Garlic Powder",                  pfgPrice: 30.77,  pfgUnit: "5 LB",       shaverPrice: 24.02, shaverUnit: "6/1 LB",      savings: null,  priority: "med", note: "Saves $2.15/lb — PFG 5 LB vs Shaver 6 LB" },
    { item: "Cheese Sauce",                   pfgPrice: 55.09,  pfgUnit: "6/#10",      shaverPrice: 48.12, shaverUnit: "6/10",        savings: 6.97,  priority: "med"  },
    { item: "Elbow Macaroni",                 pfgPrice: 19.81,  pfgUnit: "2/10 LB",    shaverPrice: 13.10, shaverUnit: "2/10 LB",     savings: 6.71,  priority: "high" },
    { item: "Oats / Oatmeal",                 pfgPrice: 35.15,  pfgUnit: "50 LB",      shaverPrice: 28.33, shaverUnit: "50 LB",       savings: 6.82,  priority: "med"  },
    { item: "Grits Quick",                    pfgPrice: 38.47,  pfgUnit: "8/5 LB",     shaverPrice: 28.00, shaverUnit: "50 LB",       savings: null,  priority: "med", note: "Saves $0.40/lb — PFG 40 LB vs Shaver 50 LB" },
    { item: "Yellow Cake Mix",                pfgPrice: 42.77,  pfgUnit: "50 LB",      shaverPrice: 40.42, shaverUnit: "50 LB",       savings: 2.35,  priority: "low"  },
    { item: "Coffee Cake Mix",                pfgPrice: 45.04,  pfgUnit: "50 LB",      shaverPrice: 42.88, shaverUnit: "50 LB",       savings: 2.16,  priority: "low"  },
    { item: "Strawberry Cake Mix",            pfgPrice: 46.13,  pfgUnit: "50 LB",      shaverPrice: 44.63, shaverUnit: "50 LB",       savings: 1.50,  priority: "low"  },
    { item: "Tomato Sauce",                   pfgPrice: 29.67,  pfgUnit: "6/#10",      shaverPrice: 28.89, shaverUnit: "6/10",        savings: 0.78,  priority: "low"  },
    { item: "Diced Tomatoes",                 pfgPrice: 30.94,  pfgUnit: "6/#10",      shaverPrice: 30.36, shaverUnit: "6/10",        savings: 0.58,  priority: "low"  },
    { item: "Margarine Solid",                pfgPrice: 38.73,  pfgUnit: "30/1 LB",    shaverPrice: 38.46, shaverUnit: "30/1 LB",     savings: 0.27,  priority: "low"  },
    { item: "Peas & Carrots Frozen",          pfgPrice: 22.35,  pfgUnit: "20 LB",      shaverPrice: 29.77, shaverUnit: "30 LB",       savings: null,  priority: "med", note: "$0.13/lb cheaper at Shaver" },
    { item: "Fry Oil Clear",                  pfgPrice: 35.70,  pfgUnit: "35 LB",      shaverPrice: 35.07, shaverUnit: "35 LB",       savings: 0.63,  priority: "low"  },
    { item: "Gravy Mix (Country)",            pfgPrice: 29.92,  pfgUnit: "6/16 OZ",    shaverPrice: 37.82, shaverUnit: "6/3 LB",      savings: null,  priority: "med", note: "$2.89/lb cheaper at Shaver" },
    { item: "Okra Cut Breaded Frozen",        pfgPrice: 41.41,  pfgUnit: "12/2 LB",    shaverPrice: 26.77, shaverUnit: "20 LB",       savings: null,  priority: "high", note: "Saves $0.39/lb — PFG 24 LB/cs ($1.725/lb) vs Shaver 20 LB/cs ($1.338/lb)" }
  ],

  keepWithPFG: [
    { item: "AP Flour 50 LB",             pfgPrice: 20.44, shaverPrice: 23.61, pfgSavings: 3.17  },
    { item: "Granulated Sugar 50 LB",     pfgPrice: 35.14, shaverPrice: 36.52, pfgSavings: 1.38  },
    { item: "Parboiled Rice 50 LB",       pfgPrice: 26.38, shaverPrice: 31.46, pfgSavings: 5.08  },
    { item: "Cream of Mushroom Soup",     pfgPrice: 54.94, shaverPrice: 60.50, pfgSavings: 5.56, unitNote: "12ct" },
    { item: "Bread Pullman",              pfgPrice: 24.90, shaverPrice: 29.06, pfgSavings: null,  unitNote: "PFG 10/24oz ($0.1038/oz) vs Shaver 12/28oz ($0.0865/oz) — Shaver cheaper per oz" },
    { item: "Pinto Beans Dry 50 LB",      pfgPrice: 25.67, shaverPrice: 29.15, pfgSavings: 3.48  }
  ],

  monthlySavings: [
    { item: "Grape Drink Mix",            qtyPerMonth: 8,  savingsPerCase: 29.32, monthlySavings: 234.56 },
    { item: "All Pasta (rotini+elbow+ziti)", qtyPerMonth: 26, savingsPerCase: 8.00, monthlySavings: 208.00 },
    { item: "Carrots Sliced Frozen",      qtyPerMonth: 24, savingsPerCase: 8.09,  monthlySavings: 194.16 },
    { item: "Great Northern Beans",       qtyPerMonth: 6,  savingsPerCase: 17.05, monthlySavings: 102.30 },
    { item: "Grits",                      qtyPerMonth: 12, savingsPerCase: 20.09, monthlySavings: 192.84 },
    { item: "Cake Mixes (all 3)",         qtyPerMonth: 32, savingsPerCase: 2.00,  monthlySavings: 64.00  },
    { item: "Potato Flakes",              qtyPerMonth: 7,  savingsPerCase: 7.73,  monthlySavings: 54.11  },
    { item: "Oats",                       qtyPerMonth: 6,  savingsPerCase: 6.82,  monthlySavings: 40.92  },
    { item: "Jelly 200ct",                qtyPerMonth: 2,  savingsPerCase: 9.67,  monthlySavings: 19.34  },
    { item: "Cheese Sauce",               qtyPerMonth: 2,  savingsPerCase: 6.97,  monthlySavings: 13.94  },
    { item: "Onion + Garlic Powder",      qtyPerMonth: 2,  savingsPerCase: 11.24, monthlySavings: 22.48  },
    { item: "TOTAL",                      qtyPerMonth: null, savingsPerCase: null, monthlySavings: 1146.32, isTotal: true }
  ],

  newItemsToAdd: [
    { category: "Protein",      item: "Corn Dog Chicken 72/2.5oz",            price: 48.45,  useCase: "Easy hot lunch protein ($0.67/ea)",     vendor: "Shaver" },
    { category: "Protein",      item: "Burrito Bean & Beef 80/4oz",           price: 44.36,  useCase: "Ready-to-serve lunch entrée ($0.55/ea)",vendor: "Shaver" },
    { category: "Protein",      item: "Burrito Bean & Cheese 80/4oz",         price: 43.40,  useCase: "Vegetarian option ($0.54/ea)",          vendor: "Shaver" },
    { category: "Protein",      item: "Bologna Logs Chik 3/8#",               price: 39.02,  useCase: "Sandwich protein variety",             vendor: "Shaver" },
    { category: "Protein",      item: "TVP Beef Chunks 25#",                  price: 60.46,  useCase: "Meat extender / cost reducer",          vendor: "Shaver" },
    { category: "Protein",      item: "TVP Chicken Chunks 25#",               price: 61.74,  useCase: "Meat extender",                        vendor: "Shaver" },
    { category: "Dry Goods",    item: "Beans Dry Lentil 50#",                 price: 49.26,  useCase: "High-protein soup base",               vendor: "Shaver" },
    { category: "Dry Goods",    item: "Beans Dry Navy 50#",                   price: 36.49,  useCase: "Navy bean soup",                       vendor: "Shaver" },
    { category: "Breakfast",    item: "Pancake 144/1.2oz",                    price: 23.08,  useCase: "Breakfast variety ($0.16/serving)",    vendor: "Shaver" },
    { category: "Breakfast",    item: "Waffle 12/12/1.25oz",                  price: 22.97,  useCase: "Breakfast variety ($0.16/serving)",    vendor: "Shaver" },
    { category: "Breakfast",    item: "French Toast 144/1.5oz",               price: 40.09,  useCase: "Breakfast variety ($0.28/serving)",    vendor: "Shaver" },
    { category: "Dry Goods",    item: "Raisin Seedless 30#",                  price: 61.59,  useCase: "Oatmeal topping, baking",              vendor: "Shaver" },
    { category: "Vegetables",   item: "Mixed Vegetables California Blend 30#",price: 26.75,  useCase: "Side dish",                            vendor: "Shaver" },
    { category: "Vegetables",   item: "Broccoli Cuts 30#",                    price: 27.47,  useCase: "Side dish",                            vendor: "Shaver" },
    { category: "Vegetables",   item: "Cauliflower 30#",                      price: 31.30,  useCase: "Side dish",                            vendor: "Shaver" },
    { category: "Vegetables",   item: "Okra Cut Breaded 20#",                 price: 26.77,  useCase: "Southern side",                        vendor: "Shaver" },
    { category: "Vegetables",   item: "Corn Cut 30#",                         price: 27.03,  useCase: "Side dish",                            vendor: "Shaver" },
    { category: "Seafood",      item: "Sardines Oil Pouch 36/3.53oz",         price: 30.59,  useCase: "High-protein PC serving",              vendor: "Shaver" }
  ],

  menuAssessment: {
    whatsWorking: [
      { point: "Consistent Structure", detail: "Breakfast / Hot Lunch / Sandwich Dinner format is operationally simple and clear" },
      { point: "Yellow Cake Utilization", detail: "Used heavily across all three meals — cost effective at $0.08–$0.11/serving" },
      { point: "Cornbread at Every Meal", detail: "Appears at every lunch and dinner — strong value filler with familiar appeal" },
      { point: "Bean Variety", detail: "Good variety across pinto, northern, green beans, and peas & carrots" }
    ],
    painPoints: [
      { number: 1, issue: "No Hot Dinner Protein", detail: "Dinner is sandwich-only every night — 4 proteins rotating (salami, turkey, PB&J, chicken patty). Nutritionally limited and monotonous for long-stay residents.", severity: "high" },
      { number: 2, issue: "Limited Breakfast Protein", detail: "Breakfast protein alternates only sausage and egg — no variety across the 4-week rotation.", severity: "med" },
      { number: 4, issue: "No Vitamin C Source", detail: "No canned fruit, citrus, or fresh produce visible in the rotation. Applesauce cups from Shaver cost $0.30/serving.", severity: "high" },
      { number: 5, issue: "Limited Beverage Options", detail: "Fortified drink mix is the only non-water option aside from milk twice weekly.", severity: "low" },
      { number: 6, issue: "Dessert is Only Cake", detail: "No gelatin, pudding, or fruit options. Shaver has gelatin at ~$0.04/serving and pudding at ~$0.05/serving.", severity: "med" }
    ]
  },

  newMenuIdeas: {
    hotLunch: [
      {
        name: "Mac & Cheese",
        costPerServing: "$0.28",
        ingredients: [
          { item: "Elbow Macaroni 2/10 LB", vendor: "Shaver", price: "$13.10" },
          { item: "Cheese Sauce 6/#10", vendor: "Shaver", price: "$48.12" }
        ],
        note: "One of the cheapest hot lunches possible — universally popular, zero waste"
      },
      {
        name: "Chili Mac",
        costPerServing: "$0.32",
        ingredients: [
          { item: "TVP Beef Chunks 25#", vendor: "Shaver", price: "$60.46" },
          { item: "Elbow Macaroni 2/10 LB", vendor: "Shaver", price: "$13.10" },
          { item: "Diced Tomatoes 6/#10", vendor: "Shaver", price: "$30.36" },
          { item: "Tomato Sauce 6/#10", vendor: "Shaver", price: "$28.89" }
        ],
        note: "TVP doubles as a beef extender — hearty, filling, under $0.35/serving"
      },
      {
        name: "Red Beans & Rice",
        costPerServing: "$0.22",
        ingredients: [
          { item: "Pinto Beans Dry 50 LB", vendor: "PFG", price: "$25.67" },
          { item: "Parboiled Rice 50 LB", vendor: "PFG", price: "$26.38" },
          { item: "Sausage crumble", vendor: "Shaver", price: "existing" }
        ],
        note: "Dirt cheap per serving, high protein and fiber — classic Southern staple"
      },
      {
        name: "Navy Bean Soup",
        costPerServing: "$0.15",
        ingredients: [
          { item: "Beans Dry Navy 50#", vendor: "Shaver", price: "$36.49" },
          { item: "Carrots Sliced Frozen 20#", vendor: "Shaver", price: "$14.34" },
          { item: "Chicken Base", vendor: "Shaver", price: "$13.34" },
          { item: "Cornbread", vendor: "PFG", price: "existing" }
        ],
        note: "Lowest cost hot lunch on this list — high protein, serve with cornbread"
      },
      {
        name: "Pasta Marinara",
        costPerServing: "$0.20",
        ingredients: [
          { item: "Rotini or Ziti Pasta 2/10 LB", vendor: "Shaver", price: "$13.73" },
          { item: "Tomato Sauce 6/#10", vendor: "Shaver", price: "$28.89" },
          { item: "Diced Tomatoes 6/#10", vendor: "Shaver", price: "$30.36" }
        ],
        note: "Under $0.20/serving — add TVP or meatballs to boost protein when budget allows"
      },
      {
        name: "Bean & Cheese Burrito Plate",
        costPerServing: "$0.54",
        ingredients: [
          { item: "Bean & Cheese Burritos 80/4oz", vendor: "Shaver", price: "$43.40 ($0.54/ea)" },
          { item: "Parboiled Rice 50 LB", vendor: "PFG", price: "$26.38" },
          { item: "Tomato Sauce (salsa)", vendor: "Shaver", price: "$28.89" }
        ],
        note: "Fully turnkey, zero prep — no cooking equipment needed"
      },
      {
        name: "Southern Beans & Rice Bowl",
        costPerServing: "$0.22",
        ingredients: [
          { item: "Great Northern Beans Dry 50#", vendor: "Shaver", price: "$39.00" },
          { item: "Parboiled Rice 50 LB", vendor: "PFG", price: "$26.38" },
          { item: "Sausage crumble", vendor: "Shaver", price: "existing" }
        ],
        note: "Flavorful, filling, dirt cheap per serving"
      },
      {
        name: "Lentil Soup",
        costPerServing: "$0.15",
        ingredients: [
          { item: "Beans Dry Lentil 50#", vendor: "Shaver", price: "$49.26" },
          { item: "Carrots Sliced Frozen 20#", vendor: "Shaver", price: "$14.34" },
          { item: "Chicken Base", vendor: "Shaver", price: "$13.34" }
        ],
        note: "Tied for cheapest — very high fiber and protein, serve with cornbread"
      },
      {
        name: "Chicken Corn Dog Plate",
        costPerServing: "$0.67",
        ingredients: [
          { item: "Corn Dog Chicken 72/2.5oz", vendor: "Shaver", price: "$48.45 ($0.67/ea)" },
          { item: "Mixed Vegetables 30#", vendor: "Shaver", price: "$26.75" },
          { item: "Cornbread", vendor: "PFG", price: "existing" }
        ],
        note: "Simple, fast, universally popular — no prep required"
      }
    ],
    breakfast: [
      {
        name: "Pancake Day",
        detail: "Shaver Pancake 144/1.2oz — $23.08/case = $0.16/serving",
        note: "Replaces bread slice on one morning per week. Add syrup ($15.83/4gal) for <$0.02/serving."
      },
      {
        name: "Waffle Day",
        detail: "Shaver Waffle 12/12/1.25oz — $22.97/case = $0.16/serving",
        note: "Same cost as pancakes, different texture — easy rotation variety"
      },
      {
        name: "French Toast",
        detail: "Shaver French Toast 144/1.5oz — $40.09/case = $0.28/serving",
        note: "Slightly higher cost but a distinct, popular offering"
      },
      {
        name: "Oatmeal with Raisins",
        detail: "Existing oatmeal + Shaver Raisins 30# ($61.59 = ~$0.04/serving added cost)",
        note: "Adds nutrition and variety to current oatmeal days with minimal cost increase"
      }
    ],
    dinner: [
      {
        name: "Bologna & Mustard Sandwich",
        costPerServing: "~$0.25",
        detail: "Shaver Bologna Logs Chik 3/8# ($39.02 = $1.63/lb) + Bread + Mustard",
        note: "One of the cheapest protein sandwiches available — slices easily at scale"
      },
      {
        name: "Chicken Salad Sandwich",
        costPerServing: "~$0.50",
        detail: "Shaver Chicken Pouch or canned chicken + Mayo + Bread Pullman",
        note: "Cold prep, no equipment needed — good rotation alongside bologna and turkey"
      },
      {
        name: "PB&J",
        costPerServing: "~$0.18",
        detail: "Peanut Butter (existing) + Jelly Assorted 200ct — Shaver $9.53 + Bread",
        note: "Lowest cost dinner option — keep on rotation as a budget anchor night"
      },
      {
        name: "Turkey & Mustard Sandwich",
        costPerServing: "~$0.45",
        detail: "Turkey deli meat (existing) + Bread Pullman + Mustard/Mayo",
        note: "Clean, familiar protein — switch bread to Shaver for per-oz savings"
      },
      {
        name: "Salami Sandwich",
        costPerServing: "~$0.40",
        detail: "Salami (existing rotation) + Bread + Mustard",
        note: "Already on current rotation — maintain as one of the weekly nights"
      }
    ],
    sides: [
      {
        name: "Gelatin (Jell-O)",
        detail: "Shaver: Cherry, Lime, Orange, Raspberry — all $23.32/case (6/16oz)",
        cost: "~$0.04/serving",
        note: "Nearly free dessert upgrade. Rotate 4 flavors across the week."
      },
      {
        name: "Vanilla or Chocolate Pudding",
        detail: "Vanilla 25# ($63.84) / Chocolate 25# ($68.93)",
        cost: "~$0.05/serving",
        note: "Replaces cake 1–2x per week — adds variety without cost increase"
      },
      {
        name: "Applesauce Cup",
        detail: "Shaver Applesauce Unsweet 96/4.5oz — $28.49/case",
        cost: "$0.30/serving",
        note: "The only vitamin C source available in current catalog. Priority add."
      },
      {
        name: "Corn on the Cob (Summer)",
        detail: "Shaver Corn Cob 3in 96ea — $33.74/case",
        cost: "$0.35/serving",
        note: "Seasonal crowd-pleaser, easy to serve, no prep required"
      },
      {
        name: "Broccoli or Cauliflower Side",
        detail: "Broccoli Cuts 30# ($27.47) or Cauliflower 30# ($31.30)",
        cost: "<$0.20/serving",
        note: "Adds vegetable variety beyond current carrot/peas rotation"
      },
      {
        name: "Breaded Okra",
        detail: "Shaver Okra Cut Breaded 20# — $26.77/case",
        cost: "<$0.20/serving",
        note: "Southern staple, pairs with any protein, adds texture variety"
      }
    ]
  },

  priorityActions: {
    immediate: [
      { num: 1, action: "Switch Drink Mix to Shaver",          detail: "Saves $29.32/case — exact same product",                                impact: "$234/mo" },
      { num: 2, action: "Switch All Pasta to Shaver",          detail: "Saves $6–$10/case across rotini, elbow, ziti",                          impact: "$208/mo" },
      { num: 3, action: "Switch Frozen Carrots to Shaver",     detail: "Saves $8.09/case",                                                      impact: "$194/mo" },
      { num: 4, action: "Switch Great Northern Beans to Shaver",detail: "Saves $17.05/case",                                                    impact: "$102/mo" },
      { num: 5, action: "Switch Jelly to Shaver",              detail: "Saves $9.67/case",                                                      impact: "$19/mo"  }
    ],
    nextMenuCycle: [
      { num: 6,  action: "Add Red Beans & Rice with Sausage",  detail: "Week 1 Wednesday lunch — pinto beans + rice + sausage crumble, ~$0.22/serving",  impact: "$0.22/serving" },
      { num: 7,  action: "Add Chili Mac",                      detail: "High-volume, hearty, uses existing pasta — TVP extends meat dollars",             impact: "~$0.32/serving" },
      { num: 8,  action: "Add Gelatin Dessert 2x/Week",        detail: "Replace cake on off days — $0.04/serving",                                        impact: "<$20/mo added cost" },
      { num: 9,  action: "Add Applesauce Cup 1x/Week",         detail: "Only vitamin C source in current catalog — $0.30/serving",                        impact: "Nutritional compliance" }
    ],
    quarterly: [
      { num: 10, action: "Pilot Burritos as Friday Lunch",          detail: "Zero prep, consistent, $0.54/serving — easy test",             impact: "Resident satisfaction" },
      { num: 11, action: "Add Pancake/Waffle/French Toast Rotation", detail: "One each per week — replaces plain bread on breakfast days",   impact: "Breakfast variety" },
      { num: 12, action: "Evaluate TVP as Meat Extender",            detail: "Test in chili mac, white bean chili, pasta marinara",          impact: "Protein cost reduction" }
    ]
  },

  catalog: {
    bakery: [
      { item: "Bread Bun Hamburger",       pack: "10/12ea",    price: 26.89 },
      { item: "Bread Bun Hoagie",          pack: "18/6ea",     price: 28.25 },
      { item: "Bread Bun Hot Dog",         pack: "12/12ea",    price: 30.12 },
      { item: "Bread Wheat Slice",         pack: "12/28oz",    price: 29.06 },
      { item: "Bread White Slice",         pack: "12/28oz",    price: 29.06 },
      { item: "French Toast",              pack: "144/1.5oz",  price: 40.09 },
      { item: "Pancake",                   pack: "144/1.2oz",  price: 23.08 },
      { item: "Waffle",                    pack: "12/12/1.25oz",price: 22.97 }
    ],
    bakingMixes: [
      { item: "Biscuit Mix",               pack: "50#",        price: 34.90 },
      { item: "Brownie Mix",               pack: "50#",        price: 48.48 },
      { item: "Cake Mix Blueberry",        pack: "50#",        price: 47.21 },
      { item: "Cake Mix Carrot",           pack: "50#",        price: 43.69 },
      { item: "Cake Mix Chocolate",        pack: "50#",        price: 43.57 },
      { item: "Cake Mix Coffee",           pack: "50#",        price: 42.88 },
      { item: "Cake Mix Spice",            pack: "50#",        price: 42.99 },
      { item: "Cake Mix Strawberry",       pack: "50#",        price: 44.63 },
      { item: "Cake Mix White",            pack: "50#",        price: 40.04 },
      { item: "Cake Mix Yellow",           pack: "50#",        price: 40.42 },
      { item: "Cookie Mix Oatmeal",        pack: "50#",        price: 41.58 },
      { item: "Cornbread Mix Southern",    pack: "50#",        price: 39.02 },
      { item: "Cornbread Mix Sweet",       pack: "50#",        price: 39.80 },
      { item: "Muffin Mix Blueberry",      pack: "50#",        price: 46.86 },
      { item: "Muffin Mix Plain",          pack: "50#",        price: 37.45 },
      { item: "Pancake Mix",               pack: "50#",        price: 37.14 }
    ],
    cereals: [
      { item: "Grits Quick White",         pack: "50#",        price: 28.00 },
      { item: "Grits Quick Yellow",        pack: "50#",        price: 22.54 },
      { item: "Oats Quick",                pack: "50#",        price: 28.33 },
      { item: "Farina",                    pack: "50#",        price: 28.95 }
    ],
    meat: [
      { item: "Chicken Brst Filt Pieces RTC",  pack: "6/6#",         price: 73.94 },
      { item: "Chicken Brst Fil RTC 4oz",      pack: "6/6#",         price: 73.90 },
      { item: "Chicken Fried Stk Pty FC 3oz",  pack: "40#",          price: 92.62 },
      { item: "Chicken Nugget BRD RTC .7oz",   pack: "20#",          price: 39.15 },
      { item: "Chicken Patty BRD FC 3oz",      pack: "40#",          price: 86.29 },
      { item: "Chicken Patty BRD FC 4oz",      pack: "40#",          price: 86.29 },
      { item: "Corn Dog Chicken",              pack: "72/2.5oz",     price: 48.45 },
      { item: "Fish Patty BRD 3oz",            pack: "25#",          price: 56.38 },
      { item: "Fish Patty BRD 4oz",            pack: "25#",          price: 56.38 },
      { item: "Ground Chicken",               pack: "40#",          price: 31.44 },
      { item: "Hot Dog Chicken 1.6oz",         pack: "10/2.4#",      price: 33.00 },
      { item: "Meatballs FC 0.5oz",            pack: "40#",          price: 83.84 },
      { item: "Meatballs FC 1oz",              pack: "40#",          price: 83.84 },
      { item: "Meatloaf Patty FC 3oz",         pack: "40#",          price: 83.81 },
      { item: "Salisbury Patty FC 3oz",        pack: "40#",          price: 85.76 },
      { item: "Salisbury Patty FC 4oz",        pack: "40#",          price: 85.76 },
      { item: "Salami Logs Chik",              pack: "2/10#",        price: 31.82 },
      { item: "Sausage Bkfst Patty FC 1oz",    pack: "40#",          price: 82.54 },
      { item: "Sausage Hot Link FC 3.2oz",     pack: "6/5#",         price: 61.08 },
      { item: "Sausage Polish FC 3.2oz",       pack: "6/5#",         price: 61.08 },
      { item: "BBQ Patty FC 3oz",              pack: "40#",          price: 85.46 },
      { item: "Bologna Logs Chik",             pack: "3/8#",         price: 39.02 },
      { item: "TVP Beef Chunks",               pack: "25#",          price: 60.46 },
      { item: "TVP Chicken Chunks",            pack: "25#",          price: 61.74 },
      { item: "Vegetarian Burger",             pack: "40/4oz",       price: 68.36 },
      { item: "Burrito Bean & Beef",           pack: "80/4oz",       price: 44.36 },
      { item: "Burrito Bean & Cheese",         pack: "80/4oz",       price: 43.40 }
    ],
    pasta: [
      { item: "Pasta Egg Noodle Wide",     pack: "10#",        price: 10.27 },
      { item: "Pasta Elbow Mac",           pack: "2/10#",      price: 13.10 },
      { item: "Pasta Lasagna",             pack: "10#",        price: 13.85 },
      { item: "Pasta Rotini",              pack: "2/10#",      price: 13.73 },
      { item: "Pasta Spaghetti",           pack: "2/10#",      price: 13.13 },
      { item: "Pasta Ziti",                pack: "2/10#",      price: 13.73 }
    ],
    riceAndPotato: [
      { item: "Rice Parboiled",            pack: "50#",        price: 31.46 },
      { item: "Rice White",                pack: "50#",        price: 25.06 },
      { item: "Rice Parboiled Brown",      pack: "25#",        price: 26.66 },
      { item: "Potato Dehy Flakes",        pack: "40#",        price: 51.62 },
      { item: "Potato Dehy Diced",         pack: "40#",        price: 56.70 },
      { item: "Potato Dehy Shredded",      pack: "25#",        price: 31.72 },
      { item: "Fries Shoestring",          pack: "6/5.5#",     price: 18.43 },
      { item: "Fries Tater Tots",          pack: "6/5#",       price: 28.85 }
    ],
    cannedVeggies: [
      { item: "Beans Black",               pack: "6/10",       price: 31.60 },
      { item: "Beans Garbanzo",            pack: "6/10",       price: 31.61 },
      { item: "Beans Green Cut",           pack: "6/10",       price: 30.84 },
      { item: "Beans Kidney Red",          pack: "6/10",       price: 33.60 },
      { item: "Beans Navy",                pack: "6/10",       price: 32.71 },
      { item: "Beans Pinto",               pack: "6/10",       price: 31.46 },
      { item: "Beans Pork",                pack: "6/10",       price: 36.18 },
      { item: "Beans Refried Vegetarian",  pack: "6/10",       price: 52.90 },
      { item: "Beets Sliced",              pack: "6/10",       price: 36.95 },
      { item: "Carrots Sliced",            pack: "6/10",       price: 28.96 },
      { item: "Corn Whole Kernel",         pack: "6/10",       price: 33.40 },
      { item: "Greens Collard Chopped",    pack: "6/10",       price: 44.89 },
      { item: "Greens Mixed Chopped",      pack: "6/10",       price: 44.95 },
      { item: "Greens Mustard Chopped",    pack: "6/10",       price: 44.89 },
      { item: "Hominy White",              pack: "6/10",       price: 36.91 },
      { item: "Mixed Vegetables",          pack: "6/10",       price: 33.19 },
      { item: "Peas and Carrots",          pack: "6/10",       price: 31.10 },
      { item: "Peas Blackeye",             pack: "6/10",       price: 37.87 },
      { item: "Peas Green",               pack: "6/10",       price: 28.50 },
      { item: "Spinach Leaf",             pack: "6/10",       price: 47.35 },
      { item: "Tomato Crushed",           pack: "6/10",       price: 29.28 },
      { item: "Tomato Diced",             pack: "6/10",       price: 30.36 },
      { item: "Tomato Paste",             pack: "6/10",       price: 37.47 },
      { item: "Tomato Sauce",             pack: "6/10",       price: 28.89 }
    ],
    cannedFruit: [
      { item: "Apple Diced Water",         pack: "6/10",       price: 29.63 },
      { item: "Apple Sliced Water",        pack: "6/10",       price: 35.56 },
      { item: "Applesauce Sweet",          pack: "6/10",       price: 34.24 },
      { item: "Applesauce Unsweet",        pack: "6/10",       price: 33.19 },
      { item: "Applesauce Unsweet",        pack: "96/4.5oz",   price: 28.49 },
      { item: "Fruit Mix LS",             pack: "6/10",       price: 41.12 },
      { item: "Orange Mandarin Seg LS",   pack: "6/10",       price: 33.52 },
      { item: "Peach Diced Juice",        pack: "6/10",       price: 32.19 },
      { item: "Peach Sliced LS",          pack: "6/10",       price: 41.02 },
      { item: "Pear Diced Juice",         pack: "6/10",       price: 32.18 },
      { item: "Pineapple Crushed Juice",  pack: "6/10",       price: 47.18 }
    ],
    frozenVeggies: [
      { item: "Beans Green Cut",           pack: "30#",        price: 33.06 },
      { item: "Broccoli Cuts",             pack: "30#",        price: 27.47 },
      { item: "Carrots Sliced",            pack: "20#",        price: 14.34 },
      { item: "Cauliflower",              pack: "30#",        price: 31.30 },
      { item: "Celery Diced",             pack: "30#",        price: 29.10 },
      { item: "Corn Cob 3in",             pack: "96ea",       price: 33.74 },
      { item: "Corn Cut",                 pack: "30#",        price: 27.03 },
      { item: "Greens Collard Chopped",   pack: "12/3#",      price: 37.81 },
      { item: "Mixed Vegetables 3-Way",   pack: "12/2.2#",    price: 25.77 },
      { item: "Mixed Vegetables CA Blend",pack: "30#",        price: 26.75 },
      { item: "Okra Cut Breaded",         pack: "20#",        price: 26.77 },
      { item: "Onion Diced",              pack: "20#",        price: 15.67 },
      { item: "Peas and Carrots",         pack: "30#",        price: 29.77 },
      { item: "Peas Green",              pack: "30#",        price: 33.16 },
      { item: "Peppers Diced",           pack: "30#",        price: 28.56 },
      { item: "Spinach Chopped",         pack: "30#",        price: 32.46 },
      { item: "Zucchini Sliced",         pack: "30#",        price: 28.75 }
    ],
    dryBeans: [
      { item: "Beans Dry Black",           pack: "50#",        price: 32.27 },
      { item: "Beans Dry Great Northern",  pack: "50#",        price: 39.00 },
      { item: "Beans Dry Kidney",          pack: "50#",        price: 41.98 },
      { item: "Beans Dry Lentil",          pack: "50#",        price: 49.26 },
      { item: "Beans Dry Lima",            pack: "50#",        price: 58.32 },
      { item: "Beans Dry Navy",            pack: "50#",        price: 36.49 },
      { item: "Beans Dry Pinto",           pack: "50#",        price: 29.15 },
      { item: "Beans Dry Pinto Splits",    pack: "50#",        price: 24.39 },
      { item: "Peas Dry Blackeye",         pack: "50#",        price: 44.31 }
    ],
    seafood: [
      { item: "Sardines Oil Pouch",        pack: "36/3.53oz",  price: 30.59 },
      { item: "Tuna Chunk Light Water Pouch",pack: "12/5oz",   price: 21.45 },
      { item: "Tuna Chunk Light VBR",      pack: "6/66.5oz",  price: 58.27 }
    ],
    desserts: [
      { item: "Gelatin Cherry",            pack: "6/16oz",     price: 23.32 },
      { item: "Gelatin Lemon",             pack: "6/16oz",     price: 23.32 },
      { item: "Gelatin Lime",             pack: "6/16oz",     price: 23.32 },
      { item: "Gelatin Orange",           pack: "6/16oz",     price: 23.32 },
      { item: "Gelatin Raspberry",        pack: "6/16oz",     price: 23.32 },
      { item: "Pudding Banana Instant",   pack: "25#",        price: 61.65 },
      { item: "Pudding Butterscotch Inst",pack: "25#",        price: 63.84 },
      { item: "Pudding Chocolate Instant",pack: "25#",        price: 68.93 },
      { item: "Pudding Lemon Instant",    pack: "25#",        price: 63.84 },
      { item: "Pudding Vanilla Instant",  pack: "25#",        price: 63.84 },
      { item: "Cookie Choc Chip .278oz",  pack: "24/18ea",    price: 20.91 },
      { item: "Cookie Oatmeal Ice",       pack: "24/18ea",    price: 20.91 }
    ],
    condiments: [
      { item: "Jelly Assorted",           pack: "200ea",      price: 9.88  },
      { item: "Jelly Assorted LC",        pack: "200ea",      price: 9.53  },
      { item: "Peanut Butter Creamy",     pack: "35#",        price: 47.01 },
      { item: "Mayo",                     pack: "4/1gal",     price: 41.48 },
      { item: "Mustard",                  pack: "4/1gal",     price: 23.05 },
      { item: "Catsup Pouch",             pack: "6/112oz",    price: 35.99 },
      { item: "Sauce BBQ",               pack: "4/1gal",     price: 28.16 },
      { item: "Dressing Italian",        pack: "4/1gal",     price: 19.34 },
      { item: "Dressing Ranch",          pack: "4/1gal",     price: 38.62 },
      { item: "Syrup Maple",             pack: "4/1gal",     price: 15.83 },
      { item: "Sauce Soy",               pack: "4/1gal",     price: 18.30 }
    ],
    beverages: [
      { item: "Drink Mix Grape 1000/1gm", pack: "1000/1gm",  price: 20.63 },
      { item: "Drink Mix Fruit Punch",    pack: "1000/1gm",  price: 20.63 },
      { item: "Drink Mix Orange",         pack: "1000/1gm",  price: 20.63 },
      { item: "Drink Mix Dairy",          pack: "25#",        price: 47.37 },
      { item: "Coffee Instant",           pack: "1000/1gm",  price: 36.99 },
      { item: "Water Bottled",            pack: "24/.5ltr",   price: 7.28  }
    ]
  }
};

// ============================================================
//  WEEKLY REPORT — April 6–12, 2026
// ============================================================
const REPORT = {
  week:    "April 6–12, 2026",
  prepared:"April 13, 2026",
  totalRevenue: 88029.11,
  totalCOGS:    43553.59,
  totalCOGSPct: 49.48,
  weeklyNet:    25889.21,
  netMarginPct: 29.41,

  locations: {
    birmingham: {
      label: "Birmingham",
      revenue: {
        total: 67692.23,
        items: [
          { cat: "Population",        amount: 50447.63, pct: 74.52 },
          { cat: "Cafe",              amount:  5090.40, pct:  7.52 },
          { cat: "Academy",           amount:  2545.20, pct:  3.76 },
          { cat: "Soft Trays",        amount:  5460.00, pct:  8.07 },
          { cat: "Milk",              amount:  2130.00, pct:  3.15 },
          { cat: "JBS",               amount:  2019.00, pct:  2.98 }
        ]
      },
      materialCOGS: {
        total: 24291.07, totalPct: 35.88,
        items: [
          { cat: "Population",        amount: 14632.84, pct: 29.01 },
          { cat: "Cafe / Acad / JBS", amount:  4298.01, pct: 44.52 },
          { cat: "Soft Trays",        amount:  2570.10, pct: 47.07 },
          { cat: "Milk",              amount:  1384.50, pct: 65.00 },
          { cat: "Chem / Disp.",      amount:  1405.62, pct:  2.08 }
        ]
      },
      labor:     { amount:  5851.66, pct:  8.64 },
      totalCOGS: { amount: 30142.73, pct: 44.53 },
      detailedNet: [
        { cat: "Population",        amount: 35814.79, pct: 52.91 },
        { cat: "Cafe / Acad / JBS", amount:  5356.59, pct:  7.91 },
        { cat: "Soft Trays",        amount:  2889.90, pct:  4.27 },
        { cat: "Milk",              amount:   745.50, pct:  1.10 },
        { cat: "Chem / Disp.",      amount: -1405.62, pct: -2.08 }
      ],
      payroll: {
        salaries: { amount: 12714.23, pct: 18.78 },
        taxes:    { amount:  1225.50, pct:  1.81 }
      },
      netLocation: { amount: 23609.77, pct: 34.88 }
    },
    bessemer: {
      label: "Bessemer",
      revenue: {
        total: 20336.88,
        items: [
          { cat: "Population",  amount: 14665.38, pct: 72.11 },
          { cat: "Cafe",        amount:  3181.50, pct: 15.64 },
          { cat: "Soft Trays",  amount:  1890.00, pct:  9.29 },
          { cat: "Milk",        amount:   600.00, pct:  2.95 }
        ]
      },
      materialCOGS: {
        total: 10526.98, totalPct: 51.76,
        items: [
          { cat: "Population",  amount:  6571.74, pct: 44.81 },
          { cat: "Cafe",        amount:  2219.01, pct: 69.75 },
          { cat: "Soft Trays",  amount:   889.65, pct: 47.07 },
          { cat: "Milk",        amount:   390.00, pct: 65.00 },
          { cat: "Chem / Disp.",amount:   456.58, pct:  2.25 }
        ]
      },
      labor:     { amount:  2883.88, pct: 14.18 },
      totalCOGS: { amount: 13410.86, pct: 65.94 },
      detailedNet: [
        { cat: "Population",  amount:  8093.64, pct: 39.80 },
        { cat: "Cafe",        amount:   962.49, pct:  4.73 },
        { cat: "Soft Trays",  amount:  1000.35, pct:  4.92 },
        { cat: "Milk",        amount:   210.00, pct:  1.03 },
        { cat: "Chem / Disp.",amount:  -456.58, pct: -2.25 }
      ],
      payroll: {
        salaries: { amount: 4238.08, pct: 20.84 },
        taxes:    { amount:  408.50, pct:  2.01 }
      },
      netLocation: { amount: 2279.44, pct: 11.21 }
    }
  }
};

// ============================================================
//  BID TRACKER — Alabama Food Service Opportunities
// ============================================================
const BIDS = {

  verify: [
    {
      id: "montgomery-county-detention",
      agency: "Montgomery County",
      facility: "Mac Sim Butler Detention Facility",
      scope: "Inmate food service operations",
      bid: "IFB 52200-25B-009",
      status: "verify",
      statusLabel: "VERIFY STATUS",
      note: "Issued FY2025 — award status unconfirmed. Call today to determine if still open.",
      contact: { name: "Myrtle Singleton", title: "Administrative Services Manager", phone: "334-832-7705" },
      location: "Montgomery, AL"
    }
  ],

  upcoming: [
    {
      id: "montgomery-municipal-jail",
      agency: "City of Montgomery",
      facility: "Municipal Jail",
      scope: "Full inmate food service operations",
      bid: "Re-bid of Contract 26-923",
      status: "upcoming",
      statusLabel: "COMING UP",
      contractExpires: "November 21, 2026",
      expectedRFP: "August–October 2026",
      actionDate: "2026-08-01",
      note: "Current contract ends Nov 21, 2026. RFP expected 60–90 days prior. Incumbent unknown — call now to position.",
      contact: { name: "Ken Barwick", title: "Purchasing", phone: "334-625-2610", email: "kbarwick@montgomeryal.gov" },
      location: "Montgomery, AL"
    },
    {
      id: "jefferson-county-paca",
      agency: "Jefferson County / PACA",
      facility: "County Facilities incl. Youth Detention",
      scope: "Food supply — frozen, chilled, and dry goods (commodity supply, not full service)",
      bid: "Annual PACA Supply Bids",
      status: "upcoming",
      statusLabel: "COMING UP",
      contractExpires: "Feb–Sep 2026 (rolling)",
      expectedRFP: "Rolling — monitor quarterly",
      actionDate: "2026-06-01",
      note: "Multiple annual supply bids (BID #14-25, #51-25, etc.) with renewal cycles. Piggyback contracts available to member agencies.",
      contact: { name: "PACA Purchasing", title: "", phone: "", email: "", url: "paca.jccal.org" },
      location: "Birmingham, AL"
    }
  ],

  radar: [
    {
      id: "adoc-canteen",
      agency: "Alabama Dept. of Corrections",
      facility: "17 ADOC Facilities Statewide",
      scope: "Inmate canteen / commissary operations",
      bid: "RFP 005-25000000002",
      status: "radar",
      statusLabel: "ON RADAR",
      contractExpires: "~2028–2030",
      expectedRFP: "~2028",
      note: "Closed Oct 2025, recently awarded. Estimated $500K–$2M/yr. Next cycle in ~3 years.",
      contact: { name: "Niketta Jeans", title: "ADOC Buyer", phone: "334-353-5515", email: "niketta.jeans@doc.alabama.gov" },
      location: "Statewide, AL"
    },
    {
      id: "adoc-statewide",
      agency: "Alabama Dept. of Corrections",
      facility: "All 27 ADOC Prisons",
      scope: "Full food service management — all 27 facilities",
      bid: "Statewide Food Service Contract",
      status: "radar",
      statusLabel: "ON RADAR",
      contractExpires: "~2028–2030",
      expectedRFP: "~2028",
      note: "Awarded to Aramark Nov 2025. Largest food service contract in Alabama corrections. Monitor for performance issues or early re-bid.",
      contact: { name: "ADOC Procurement", title: "", phone: "334-353-3870", email: "", url: "doc.alabama.gov" },
      location: "Statewide, AL"
    },
    {
      id: "jefferson-county-jail",
      agency: "Jefferson County Sheriff",
      facility: "Jefferson County Jail (Birmingham + Bessemer)",
      scope: "Inmate food service — ~1,100–1,200 daily population",
      bid: "Unknown — Sheriff discretion",
      status: "radar",
      statusLabel: "ON RADAR",
      contractExpires: "Unknown",
      expectedRFP: "Unknown — monitor",
      note: "No public RFP found. Alabama sheriff's food fund law allows direct contracting. Contact Sheriff's Office to learn current vendor and contract term.",
      contact: { name: "Jefferson County Sheriff's Office", title: "Corrections Division", phone: "", email: "", url: "jeffcosheriffal.com/corrections" },
      location: "Birmingham, AL"
    }
  ],

  portals: [
    { name: "ADOC RFP Page",         url: "http://www.doc.state.al.us/RequestForProposals" },
    { name: "Alabama STAARS/AlabamaBuys", url: "https://procurement.staars.alabama.gov" },
    { name: "BidNet Direct — Alabama", url: "https://www.bidnetdirect.com/alabama" },
    { name: "Jefferson County PACA",  url: "https://paca.jccal.org" },
    { name: "Alabama Bid Network",    url: "https://www.alabamabids.com" }
  ]
};

/* ============================================================
   4-WEEK MENU ROTATION
   Edit meals here — changes reflect instantly in the Menus tab.
   Structure: { day, breakfast:{main,sides,cost}, lunch:{main,sides,cost}, dinner:{main,sides,cost} }
   ============================================================ */
/* ============================================================
   4-WEEK MENU ROTATION
   Edit meals here — changes reflect instantly in the Menus tab.
   All meals use existing inventory. Target: ~2,500 cal/day.
   Structure: { day, breakfast:{main,sides,cost,cal}, lunch:{...}, dinner:{...} }
   ============================================================ */
/* ============================================================
   4-WEEK MENU ROTATION  —  Existing meals only, protein every meal
   Target: ~$0.62/meal avg  ·  ~2,550 cal/day  ·  3+ sides per meal
   Edit here — grid re-renders instantly.
   ============================================================ */
const MENU_ROTATION = [
  {
    week: 1, label: "Week 1",
    days: [
      { day: "Monday",
        breakfast: { main: "Grits + Sausage Patty",          protein: "Sausage",       sides: ["Bread (2 sl)","Jelly","Drink Mix"],             cost: "$0.52", cal: 640 },
        lunch:     { main: "Pinto Beans & Rice + Sausage",   protein: "Sausage",       sides: ["Cornbread (2)","Peas & Carrots","Cake"],          cost: "$0.65", cal: 1090 },
        dinner:    { main: "Turkey Sandwich",                protein: "Turkey",        sides: ["Cornbread","Green Beans","Cake"],                  cost: "$0.72", cal: 860 } },
      { day: "Tuesday",
        breakfast: { main: "Oatmeal + 2 Boiled Eggs",        protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.48", cal: 620 },
        lunch:     { main: "Mac & Cheese + Bologna",         protein: "Bologna",       sides: ["Cornbread (2)","Mixed Veg","Cake"],               cost: "$0.65", cal: 1060 },
        dinner:    { main: "Salami Sandwich",                protein: "Salami",        sides: ["Cornbread","Peas & Carrots","Cake"],               cost: "$0.65", cal: 840 } },
      { day: "Wednesday",
        breakfast: { main: "Eggs Scrambled + Sausage",       protein: "Eggs & Sausage",sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.55", cal: 710 },
        lunch:     { main: "Pasta w/ Meat Sauce",            protein: "Sausage",       sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.65", cal: 1040 },
        dinner:    { main: "Chicken Patty Sandwich",         protein: "Chicken Patty", sides: ["Cornbread","Mixed Veg","Cake"],                   cost: "$0.78", cal: 880 } },
      { day: "Thursday",
        breakfast: { main: "Grits + 2 Boiled Eggs",          protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.45", cal: 600 },
        lunch:     { main: "Northern Beans & Rice + Sausage",protein: "Sausage",       sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.65", cal: 1090 },
        dinner:    { main: "Turkey Sandwich",                protein: "Turkey",        sides: ["Cornbread","Peas & Carrots","Cake"],               cost: "$0.72", cal: 860 } },
      { day: "Friday",
        breakfast: { main: "Grits + Sausage Patty",          protein: "Sausage",       sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.52", cal: 640 },
        lunch:     { main: "Mac & Cheese + Bologna",         protein: "Bologna",       sides: ["Cornbread (2)","Peas & Carrots","Cake"],          cost: "$0.65", cal: 1060 },
        dinner:    { main: "Burger Patty Sandwich",          protein: "Burger Patty",  sides: ["Cornbread","Green Beans","Cake"],                  cost: "$0.62", cal: 850 } },
      { day: "Saturday",
        breakfast: { main: "Oatmeal + 2 Boiled Eggs",        protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.48", cal: 620 },
        lunch:     { main: "Pasta & Veg + Bologna",          protein: "Bologna",       sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.62", cal: 1020 },
        dinner:    { main: "Burger Patty Sandwich",          protein: "Burger Patty",  sides: ["Cornbread","Mixed Veg","Cake"],                   cost: "$0.62", cal: 850 } },
      { day: "Sunday",
        breakfast: { main: "Eggs Scrambled + Sausage",       protein: "Eggs & Sausage",sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.55", cal: 710 },
        lunch:     { main: "Mashed Potatoes & Gravy + Sausage",protein:"Sausage",      sides: ["Cornbread (2)","Mixed Veg","Cake"],               cost: "$0.68", cal: 1080 },
        dinner:    { main: "Chicken Patty Sandwich",         protein: "Chicken Patty", sides: ["Cornbread","Peas & Carrots","Cake"],              cost: "$0.78", cal: 880 } }
    ]
  },
  {
    week: 2, label: "Week 2",
    days: [
      { day: "Monday",
        breakfast: { main: "Grits + Sausage Patty",          protein: "Sausage",       sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.52", cal: 640 },
        lunch:     { main: "Pinto Beans & Rice + Sausage",   protein: "Sausage",       sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.65", cal: 1090 },
        dinner:    { main: "Turkey Sandwich",                protein: "Turkey",        sides: ["Cornbread","Mixed Veg","Cake"],                    cost: "$0.72", cal: 860 } },
      { day: "Tuesday",
        breakfast: { main: "Oatmeal + 2 Boiled Eggs",        protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.48", cal: 620 },
        lunch:     { main: "Pasta w/ Meat Sauce",            protein: "Sausage",       sides: ["Cornbread (2)","Peas & Carrots","Cake"],          cost: "$0.65", cal: 1040 },
        dinner:    { main: "Burger Patty Sandwich",          protein: "Burger Patty",  sides: ["Cornbread","Green Beans","Cake"],                  cost: "$0.62", cal: 850 } },
      { day: "Wednesday",
        breakfast: { main: "Eggs Scrambled + Sausage",       protein: "Eggs & Sausage",sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.55", cal: 710 },
        lunch:     { main: "Northern Beans & Rice + Sausage",protein: "Sausage",       sides: ["Cornbread (2)","Mixed Veg","Cake"],               cost: "$0.65", cal: 1090 },
        dinner:    { main: "Chicken Patty Sandwich",         protein: "Chicken Patty", sides: ["Cornbread","Peas & Carrots","Cake"],              cost: "$0.78", cal: 880 } },
      { day: "Thursday",
        breakfast: { main: "Grits + 2 Boiled Eggs",          protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.45", cal: 600 },
        lunch:     { main: "Mac & Cheese + Bologna",         protein: "Bologna",       sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.65", cal: 1060 },
        dinner:    { main: "Burger Patty Sandwich",          protein: "Burger Patty",  sides: ["Cornbread","Mixed Veg","Cake"],                   cost: "$0.62", cal: 850 } },
      { day: "Friday",
        breakfast: { main: "Grits + Sausage Patty",          protein: "Sausage",       sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.52", cal: 640 },
        lunch:     { main: "Mashed Potatoes & Gravy + Sausage",protein:"Sausage",      sides: ["Cornbread (2)","Peas & Carrots","Cake"],          cost: "$0.68", cal: 1080 },
        dinner:    { main: "Turkey Sandwich",                protein: "Turkey",        sides: ["Cornbread","Green Beans","Cake"],                  cost: "$0.72", cal: 860 } },
      { day: "Saturday",
        breakfast: { main: "Oatmeal + 2 Boiled Eggs",        protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.48", cal: 620 },
        lunch:     { main: "Pasta & Veg + Bologna",          protein: "Bologna",       sides: ["Cornbread (2)","Mixed Veg","Cake"],               cost: "$0.62", cal: 1020 },
        dinner:    { main: "Salami Sandwich",                protein: "Salami",        sides: ["Cornbread","Peas & Carrots","Cake"],               cost: "$0.65", cal: 840 } },
      { day: "Sunday",
        breakfast: { main: "Eggs Scrambled + Sausage",       protein: "Eggs & Sausage",sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.55", cal: 710 },
        lunch:     { main: "Pinto Beans & Rice + Sausage",   protein: "Sausage",       sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.65", cal: 1090 },
        dinner:    { main: "Chicken Patty Sandwich",         protein: "Chicken Patty", sides: ["Cornbread","Mixed Veg","Cake"],                   cost: "$0.78", cal: 880 } }
    ]
  },
  {
    week: 3, label: "Week 3",
    days: [
      { day: "Monday",
        breakfast: { main: "Grits + Sausage Patty",          protein: "Sausage",       sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.52", cal: 640 },
        lunch:     { main: "Northern Beans & Rice + Sausage",protein: "Sausage",       sides: ["Cornbread (2)","Peas & Carrots","Cake"],          cost: "$0.65", cal: 1090 },
        dinner:    { main: "Burger Patty Sandwich",          protein: "Burger Patty",  sides: ["Cornbread","Mixed Veg","Cake"],                    cost: "$0.62", cal: 850 } },
      { day: "Tuesday",
        breakfast: { main: "Oatmeal + 2 Boiled Eggs",        protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.48", cal: 620 },
        lunch:     { main: "Mac & Cheese + Bologna",         protein: "Bologna",       sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.65", cal: 1060 },
        dinner:    { main: "Turkey Sandwich",                protein: "Turkey",        sides: ["Cornbread","Peas & Carrots","Cake"],               cost: "$0.72", cal: 860 } },
      { day: "Wednesday",
        breakfast: { main: "Eggs Scrambled + Sausage",       protein: "Eggs & Sausage",sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.55", cal: 710 },
        lunch:     { main: "Pasta w/ Meat Sauce",            protein: "Sausage",       sides: ["Cornbread (2)","Mixed Veg","Cake"],               cost: "$0.65", cal: 1040 },
        dinner:    { main: "Burger Patty Sandwich",          protein: "Burger Patty",  sides: ["Cornbread","Green Beans","Cake"],                 cost: "$0.62", cal: 850 } },
      { day: "Thursday",
        breakfast: { main: "Grits + 2 Boiled Eggs",          protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.45", cal: 600 },
        lunch:     { main: "Mashed Potatoes & Gravy + Sausage",protein:"Sausage",      sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.68", cal: 1080 },
        dinner:    { main: "Chicken Patty Sandwich",         protein: "Chicken Patty", sides: ["Cornbread","Peas & Carrots","Cake"],              cost: "$0.78", cal: 880 } },
      { day: "Friday",
        breakfast: { main: "Grits + Sausage Patty",          protein: "Sausage",       sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.52", cal: 640 },
        lunch:     { main: "Pinto Beans & Rice + Sausage",   protein: "Sausage",       sides: ["Cornbread (2)","Peas & Carrots","Cake"],          cost: "$0.65", cal: 1090 },
        dinner:    { main: "Turkey Sandwich",                protein: "Turkey",        sides: ["Cornbread","Mixed Veg","Cake"],                    cost: "$0.72", cal: 860 } },
      { day: "Saturday",
        breakfast: { main: "Oatmeal + 2 Boiled Eggs",        protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.48", cal: 620 },
        lunch:     { main: "Pasta & Veg + Bologna",          protein: "Bologna",       sides: ["Cornbread (2)","Peas & Carrots","Cake"],          cost: "$0.62", cal: 1020 },
        dinner:    { main: "Salami Sandwich",                protein: "Salami",        sides: ["Cornbread","Green Beans","Cake"],                  cost: "$0.65", cal: 840 } },
      { day: "Sunday",
        breakfast: { main: "Eggs Scrambled + Sausage",       protein: "Eggs & Sausage",sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.55", cal: 710 },
        lunch:     { main: "Northern Beans & Rice + Sausage",protein: "Sausage",       sides: ["Cornbread (2)","Mixed Veg","Cake"],               cost: "$0.65", cal: 1090 },
        dinner:    { main: "Chicken Patty Sandwich",         protein: "Chicken Patty", sides: ["Cornbread","Peas & Carrots","Cake"],              cost: "$0.78", cal: 880 } }
    ]
  },
  {
    week: 4, label: "Week 4",
    days: [
      { day: "Monday",
        breakfast: { main: "Grits + Sausage Patty",          protein: "Sausage",       sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.52", cal: 640 },
        lunch:     { main: "Pasta w/ Meat Sauce",            protein: "Sausage",       sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.65", cal: 1040 },
        dinner:    { main: "Turkey Sandwich",                protein: "Turkey",        sides: ["Cornbread","Peas & Carrots","Cake"],               cost: "$0.72", cal: 860 } },
      { day: "Tuesday",
        breakfast: { main: "Oatmeal + 2 Boiled Eggs",        protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.48", cal: 620 },
        lunch:     { main: "Mashed Potatoes & Gravy + Sausage",protein:"Sausage",      sides: ["Cornbread (2)","Peas & Carrots","Cake"],          cost: "$0.68", cal: 1080 },
        dinner:    { main: "Burger Patty Sandwich",          protein: "Burger Patty",  sides: ["Cornbread","Green Beans","Cake"],                  cost: "$0.62", cal: 850 } },
      { day: "Wednesday",
        breakfast: { main: "Eggs Scrambled + Sausage",       protein: "Eggs & Sausage",sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.55", cal: 710 },
        lunch:     { main: "Mac & Cheese + Bologna",         protein: "Bologna",       sides: ["Cornbread (2)","Mixed Veg","Cake"],               cost: "$0.65", cal: 1060 },
        dinner:    { main: "Chicken Patty Sandwich",         protein: "Chicken Patty", sides: ["Cornbread","Mixed Veg","Cake"],                   cost: "$0.78", cal: 880 } },
      { day: "Thursday",
        breakfast: { main: "Grits + 2 Boiled Eggs",          protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.45", cal: 600 },
        lunch:     { main: "Pinto Beans & Rice + Sausage",   protein: "Sausage",       sides: ["Cornbread (2)","Green Beans","Cake"],             cost: "$0.65", cal: 1090 },
        dinner:    { main: "Burger Patty Sandwich",          protein: "Burger Patty",  sides: ["Cornbread","Peas & Carrots","Cake"],              cost: "$0.62", cal: 850 } },
      { day: "Friday",
        breakfast: { main: "Grits + Sausage Patty",          protein: "Sausage",       sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.52", cal: 640 },
        lunch:     { main: "Northern Beans & Rice + Sausage",protein: "Sausage",       sides: ["Cornbread (2)","Mixed Veg","Cake"],               cost: "$0.65", cal: 1090 },
        dinner:    { main: "Turkey Sandwich",                protein: "Turkey",        sides: ["Cornbread","Green Beans","Cake"],                  cost: "$0.72", cal: 860 } },
      { day: "Saturday",
        breakfast: { main: "Oatmeal + 2 Boiled Eggs",        protein: "Eggs",          sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.48", cal: 620 },
        lunch:     { main: "Pasta & Veg + Bologna",          protein: "Bologna",       sides: ["Cornbread (2)","Mixed Veg","Cake"],               cost: "$0.62", cal: 1020 },
        dinner:    { main: "Salami Sandwich",                protein: "Salami",        sides: ["Cornbread","Peas & Carrots","Cake"],               cost: "$0.65", cal: 840 } },
      { day: "Sunday",
        breakfast: { main: "Eggs Scrambled + Sausage",       protein: "Eggs & Sausage",sides: ["Bread (2 sl)","Jelly","Drink Mix"],               cost: "$0.55", cal: 710 },
        lunch:     { main: "Mashed Potatoes & Gravy + Sausage",protein:"Sausage",      sides: ["Cornbread (2)","Peas & Carrots","Cake"],          cost: "$0.68", cal: 1080 },
        dinner:    { main: "Chicken Patty Sandwich",         protein: "Chicken Patty", sides: ["Cornbread","Green Beans","Cake"],                 cost: "$0.78", cal: 880 } }
    ]
  }
];

const MEAL_IDEAS = {
  breakfast: [
    { name: "Biscuits & Gravy",       cost: "$0.34", note: "Biscuit mix + country gravy — comfort staple, zero waste, easy batch" },
    { name: "Cinnamon Oatmeal",       cost: "$0.22", note: "Existing oatmeal + cinnamon + sugar packets — simple upgrade" },
    { name: "Grits Bar",              cost: "$0.28", note: "Grits base + rotating toppings (butter, sausage, cheese sauce) — adds variety to existing grits days" },
    { name: "Egg & Sausage Sandwich", cost: "$0.48", note: "Scrambled egg + sausage patty on bread — hot sandwich format, no new equipment" },
    { name: "Oatmeal Cookie",         cost: "$0.12", note: "Shaver Oatmeal Cookie Mix 50# ($41.58) — bake as breakfast dessert or snack" },
    { name: "Golden Brown Pancakes",  cost: "$0.53", note: "Big Daddy GSS MF 7000 · 144/1.25oz IQF · $38/case · 2 pancakes per serving — no prep, just heat" }
  ],
  lunch: [
    { name: "White Bean Chili",       cost: "$0.24", note: "Great Northern Beans + tomatoes + chicken base + spices — hearty, filling, very cheap" },
    { name: "Beef Vegetable Soup",    cost: "$0.35", note: "TVP beef chunks + mixed veg + chicken base + tomato — volume extender, high perceived value" },
    { name: "Split Pea Soup",         cost: "$0.18", note: "Split peas (add to Shaver order) + carrots + chicken base — cheapest soup option" },
    { name: "Potato Soup",            cost: "$0.22", note: "Dehy potato flakes + chicken base + margarine — thick, filling, uses existing inventory" },
    { name: "Rice & Brown Gravy",     cost: "$0.19", note: "Parboiled rice + country gravy mix — ultra-low cost, serves as a side or main" },
    { name: "Tater Tot Casserole",    cost: "$0.58", note: "Shaver Tater Tots 6/5# ($28.85) + cheese sauce + TVP — crowd favorite, simple assembly" },
    { name: "Sloppy Joe (TVP)",       cost: "$0.38", note: "TVP beef + tomato sauce + seasoning on bread — familiar protein that stretches budget" },
    { name: "Ground Beef & Rice",     cost: "$0.68", note: "Big Daddy SEP-4/10 · 40 LB/$107.60 · $2.69/lb · $0.34/2oz serving — real beef protein in hot lunch rotation" },
    { name: "Black Bean Rice Bowl",   cost: "$0.25", note: "Shaver Black Beans 6/10 ($31.60) + rice + cumin — add hot sauce packs for variety" },
    { name: "Pinto Bean Stew",        cost: "$0.20", note: "Pinto beans + diced tomatoes + chicken base — thicker than soup, serve over cornbread" },
    { name: "Collard Greens & Ham",   cost: "$0.30", note: "Shaver Collard Greens 6/10 ($44.89) + ham bits + cornbread — Southern classic" }
  ],
  dinner: [
    { name: "Grilled Cheese",         cost: "$0.28", note: "Cheese sauce or slice + bread on flat top — hot dinner option when equipment allows" },
    { name: "Ham & Mustard Sandwich", cost: "$0.42", note: "Deli ham + bread + mustard — solid alternative to turkey or bologna rotation" },
    { name: "Egg Salad Sandwich",     cost: "$0.30", note: "Hard cooked eggs + mayo + bread — different protein source, low cost" },
    { name: "Pimento Cheese Sandwich",cost: "$0.28", note: "Southern staple — shelf stable spread + bread, very popular in AL facilities" },
    { name: "Hoagie Sub",             cost: "$0.55", note: "Shaver Hoagie Bun 18/6ea ($28.25) + 2 meats + condiments — higher perceived value, once per rotation" }
  ],
  sides: [
    { name: "Applesauce Cup",         cost: "$0.30", note: "Priority add — only vitamin C source in catalog. Shaver 96/4.5oz ($28.49)" },
    { name: "Gelatin Rotation",       cost: "$0.04", note: "Cherry, Lime, Orange, Raspberry — all $23.32/case. Replace cake 2x/week" },
    { name: "Pudding Cup",            cost: "$0.05", note: "Vanilla ($63.84/25#) or Chocolate ($68.93/25#) — dessert variety with minimal cost" },
    { name: "Corn on the Cob",        cost: "$0.35", note: "Shaver 96ea ($33.74) — seasonal, easy, crowd favorite. No prep needed" },
    { name: "Collard Greens",         cost: "$0.20", note: "Shaver 6/10 ($44.89) — adds vegetable variety, Southern appeal" },
    { name: "Blackeye Peas",          cost: "$0.20", note: "Shaver 6/10 ($37.87) — New Year's tradition, rotate in January" },
    { name: "Breaded Okra",           cost: "$0.20", note: "Shaver 20# ($26.77) — Southern staple, pairs with any protein" },
    { name: "Coleslaw Mix",           cost: "$0.15", note: "Shredded cabbage + mayo + vinegar — fresh side option, low prep" }
  ]
};


/* ============================================================
   VENDOR SOURCE DOCUMENTS
   Used by the price-reference modal to cite where each price comes from.
   ============================================================ */
const VENDOR_SOURCES = {
  pfg:      { key: "pfg",      name: "PFG",        fullName: "Performance Food Group",    doc: "Invoice #6776963",         date: "April 7, 2026"    },
  shaver:   { key: "shaver",   name: "Shaver ISP", fullName: "Shaver Foods ISP Price List", doc: "ISP Price List",         date: "March 1–31, 2026" },
  bigDaddy: { key: "bigDaddy", name: "Big Daddy",  fullName: "Big Daddy Foods, Inc.",     doc: "Sales Order BA24865",      date: "April 9, 2026"    }
};

/* ============================================================
   PROTEIN VENDOR COMPARISON
   PFG = existing distributor  |  Shaver = ISP catalog  |  Big Daddy = bulk direct
   perServing = oz portion listed in MENU_ROTATION
   ref = source citation for price-reference modal
   priceVerified = true if pulled directly from an invoice/price list on file
   ============================================================ */
const PROTEIN_VENDORS = [
  {
    name: "Breakfast Sausage Patty",
    icon: "fa-circle",
    usedIn: "Breakfast — Grits+Sausage · Eggs+Sausage",
    servingSize: "2 oz",
    vendors: {
      pfg: {
        label: "PFG", pack: "40 LB", casePrice: 84.40, perLb: 2.11, perServing: 0.26,
        note: "Verify current contract price", status: "current", priceVerified: false,
        ref: { sourceDoc: "PFG Invoice #6776963", sourceDate: "April 7, 2026",
               itemDesc: "Breakfast Sausage Patty FC — est. from PFG contract",
               calcDetail: "$84.40 case ÷ 40 LB = $2.11/lb · 2 oz serving = $0.26",
               caveat: "Price estimate — confirm current contract rate before ordering." }
      },
      shaver: {
        label: "Shaver", pack: "40 LB", casePrice: 82.54, perLb: 2.06, perServing: 0.26,
        note: "Sausage Bkfst Patty FC 1oz · ISP", status: "available", priceVerified: true,
        ref: { sourceDoc: "Shaver ISP Price List", sourceDate: "March 1–31, 2026",
               itemDesc: "Sausage Bkfst Patty FC 1oz  |  40 LB case",
               calcDetail: "$82.54 case ÷ 40 LB = $2.06/lb · 2 oz serving = $0.26" }
      },
      bigDaddy: {
        label: "Big Daddy", pack: "Bulk", casePrice: null, perLb: null, perServing: null,
        note: "Request bulk quote", status: "quote", priceVerified: false,
        ref: null
      }
    }
  },
  {
    name: "Bologna (Chicken)",
    icon: "fa-circle",
    usedIn: "Lunch — Mac & Cheese · Pasta & Veg",
    servingSize: "2 oz",
    vendors: {
      pfg: {
        label: "PFG", pack: "3/8 LB", casePrice: 41.50, perLb: 1.73, perServing: 0.22,
        note: "Verify current contract price", status: "available", priceVerified: false,
        ref: { sourceDoc: "PFG Invoice #6776963", sourceDate: "April 7, 2026",
               itemDesc: "Bologna Chicken Logs 3/8 LB — est. from PFG contract",
               calcDetail: "$41.50 case ÷ 24 LB = $1.73/lb · 2 oz serving = $0.22",
               caveat: "Price estimate — confirm current contract rate." }
      },
      shaver: {
        label: "Shaver", pack: "3/8 LB", casePrice: 39.02, perLb: 1.63, perServing: 0.20,
        note: "Bologna Logs Chik · ISP", status: "best", priceVerified: true,
        ref: { sourceDoc: "Shaver ISP Price List", sourceDate: "March 1–31, 2026",
               itemDesc: "Bologna Logs Chik  |  3/8 LB case (24 LB)",
               calcDetail: "$39.02 case ÷ 24 LB = $1.63/lb · 2 oz serving = $0.20" }
      },
      bigDaddy: {
        label: "Big Daddy", pack: "Bulk", casePrice: null, perLb: null, perServing: null,
        note: "Request bulk quote", status: "quote", priceVerified: false,
        ref: null
      }
    }
  },
  {
    name: "Salami (Chicken)",
    icon: "fa-circle",
    usedIn: "Dinner — Salami Sandwich",
    servingSize: "2 oz",
    vendors: {
      pfg: {
        label: "PFG", pack: "2/10 LB", casePrice: 34.20, perLb: 1.71, perServing: 0.21,
        note: "Verify current contract price", status: "current", priceVerified: false,
        ref: { sourceDoc: "PFG Invoice #6776963", sourceDate: "April 7, 2026",
               itemDesc: "Salami Chicken Logs 2/10 LB — est. from PFG contract",
               calcDetail: "$34.20 case ÷ 20 LB = $1.71/lb · 2 oz serving = $0.21",
               caveat: "Price estimate — confirm current contract rate." }
      },
      shaver: {
        label: "Shaver", pack: "2/10 LB", casePrice: 31.82, perLb: 1.59, perServing: 0.20,
        note: "Salami Logs Chik · ISP", status: "best", priceVerified: true,
        ref: { sourceDoc: "Shaver ISP Price List", sourceDate: "March 1–31, 2026",
               itemDesc: "Salami Logs Chik  |  2/10 LB case (20 LB)",
               calcDetail: "$31.82 case ÷ 20 LB = $1.59/lb · 2 oz serving = $0.20" }
      },
      bigDaddy: {
        label: "Big Daddy", pack: "Bulk", casePrice: null, perLb: null, perServing: null,
        note: "Request bulk quote", status: "quote", priceVerified: false,
        ref: null
      }
    }
  },
  {
    name: "Chicken Patty (3 oz)",
    icon: "fa-circle",
    usedIn: "Dinner — Chicken Patty Sandwich",
    servingSize: "3 oz",
    vendors: {
      pfg: {
        label: "PFG", pack: "40 LB", casePrice: 89.50, perLb: 2.24, perServing: 0.42,
        note: "Verify current contract price", status: "available", priceVerified: false,
        ref: { sourceDoc: "PFG Invoice #6776963", sourceDate: "April 7, 2026",
               itemDesc: "Chicken Patty BRD FC 3oz — est. from PFG contract",
               calcDetail: "$89.50 case ÷ 40 LB = $2.24/lb · 3 oz serving = $0.42",
               caveat: "Price estimate — verify current contract price before using in a bid." }
      },
      shaver: {
        label: "Shaver", pack: "40 LB", casePrice: 86.29, perLb: 2.16, perServing: 0.41,
        note: "Chicken Patty BRD FC 3oz · ISP", status: "available", priceVerified: true,
        ref: { sourceDoc: "Shaver ISP Price List", sourceDate: "March 1–31, 2026",
               itemDesc: "Chicken Patty BRD FC 3oz  |  40 LB case",
               calcDetail: "$86.29 case ÷ 40 LB = $2.16/lb · 3 oz serving = $0.405 → $0.41" }
      },
      bigDaddy: {
        label: "Big Daddy", pack: "—", casePrice: null, perLb: null, perServing: null,
        note: "No patty equivalent — see Chicken Nuggets row", status: "quote", priceVerified: false,
        ref: null
      }
    }
  },
  {
    name: "Chicken Nuggets (3 oz)",
    icon: "fa-circle",
    usedIn: "Dinner — Chicken Nugget Plate",
    servingSize: "3 oz",
    vendors: {
      pfg: {
        label: "PFG", pack: "—", casePrice: null, perLb: null, perServing: null,
        note: "Request quote", status: "quote", priceVerified: false,
        ref: null
      },
      shaver: {
        label: "Shaver", pack: "20 LB", casePrice: 39.15, perLb: 1.96, perServing: 0.37,
        note: "Chicken Nugget BRD RTC .7oz · ISP", status: "available", priceVerified: true,
        ref: { sourceDoc: "Shaver ISP Price List", sourceDate: "March 1–31, 2026",
               itemDesc: "Chicken Nugget BRD RTC .7oz  |  20 LB case",
               calcDetail: "$39.15 case ÷ 20 LB = $1.96/lb · 3 oz serving = $0.368 → $0.37" }
      },
      bigDaddy: {
        label: "Big Daddy", pack: "6/6 LB", casePrice: 53.46, perLb: 1.49, perServing: 0.28,
        note: "PP90377 Seasoned Breast Nuggets · S.O. BA24865", status: "best", priceVerified: true,
        ref: { sourceDoc: "Big Daddy Foods S.O. BA24865", sourceDate: "April 9, 2026",
               itemDesc: "PP90377 — Seasoned Breast Nuggets  |  6/6 LB pack · 36 LB/case · 40 cases ordered",
               calcDetail: "$53.46 case ÷ 36 LB = $1.485/lb · 3 oz serving = $0.278 → $0.28",
               invoiceLineTotal: "$2,138.40 (40 cases × $53.46)",
               bdInvoiceSection: true }
      }
    }
  },
  {
    name: "Turkey (Deli)",
    icon: "fa-circle",
    usedIn: "Dinner — Turkey Sandwich",
    servingSize: "3 oz",
    vendors: {
      pfg: {
        label: "PFG", pack: "2/10 LB", casePrice: 52.00, perLb: 2.60, perServing: 0.49,
        note: "Verify current contract price", status: "current", priceVerified: false,
        ref: { sourceDoc: "PFG Invoice #6776963", sourceDate: "April 7, 2026",
               itemDesc: "Turkey Deli Meat 2/10 LB — est. from PFG contract",
               calcDetail: "$52.00 case ÷ 20 LB = $2.60/lb · 3 oz serving = $0.49",
               caveat: "Price estimate — confirm current contract rate." }
      },
      shaver: {
        label: "Shaver", pack: "Contact", casePrice: null, perLb: null, perServing: null,
        note: "Not in current ISP — request quote", status: "quote", priceVerified: false,
        ref: null
      },
      bigDaddy: {
        label: "Big Daddy", pack: "Bulk", casePrice: null, perLb: null, perServing: null,
        note: "Request bulk quote", status: "quote", priceVerified: false,
        ref: null
      }
    }
  },
  {
    name: "Peanut Butter",
    icon: "fa-circle",
    usedIn: "Dinner — PB&J + Boiled Egg",
    servingSize: "2 oz",
    vendors: {
      pfg: {
        label: "PFG", pack: "35 LB", casePrice: 49.20, perLb: 1.41, perServing: 0.18,
        note: "Verify current contract price", status: "available", priceVerified: false,
        ref: { sourceDoc: "PFG Invoice #6776963", sourceDate: "April 7, 2026",
               itemDesc: "Peanut Butter Creamy 35 LB — est. from PFG contract",
               calcDetail: "$49.20 case ÷ 35 LB = $1.41/lb · 2 oz serving = $0.18",
               caveat: "Price estimate — confirm current contract rate." }
      },
      shaver: {
        label: "Shaver", pack: "35 LB", casePrice: 47.01, perLb: 1.34, perServing: 0.17,
        note: "Peanut Butter Creamy 35# · ISP", status: "best", priceVerified: true,
        ref: { sourceDoc: "Shaver ISP Price List", sourceDate: "March 1–31, 2026",
               itemDesc: "Peanut Butter Creamy  |  35 LB case",
               calcDetail: "$47.01 case ÷ 35 LB = $1.34/lb · 2 oz serving = $0.17" }
      },
      bigDaddy: {
        label: "Big Daddy", pack: "Bulk", casePrice: null, perLb: null, perServing: null,
        note: "Request bulk quote", status: "quote", priceVerified: false,
        ref: null
      }
    }
  },
  {
    name: "Eggs (Whole)",
    icon: "fa-circle",
    usedIn: "Breakfast — Boiled · Scrambled",
    servingSize: "2 eggs",
    vendors: {
      pfg: {
        label: "PFG", pack: "15 doz", casePrice: 28.50, perLb: null, perServing: 0.10,
        note: "Market price — verify weekly", status: "current", priceVerified: false,
        ref: { sourceDoc: "PFG Market Price", sourceDate: "Weekly — verify current rate",
               itemDesc: "Shell Eggs Grade A  |  15 dozen case",
               calcDetail: "$28.50 case ÷ 180 eggs = $0.158/egg · 2 eggs/serving ≈ $0.10 est.",
               caveat: "Egg prices fluctuate weekly. Verify before ordering or using in cost projections." }
      },
      shaver: {
        label: "Shaver", pack: "Contact", casePrice: null, perLb: null, perServing: null,
        note: "Not in current ISP — request quote", status: "quote", priceVerified: false,
        ref: null
      },
      bigDaddy: {
        label: "Big Daddy", pack: "30 doz", casePrice: null, perLb: null, perServing: null,
        note: "Bulk flat — request quote", status: "quote", priceVerified: false,
        ref: null
      }
    }
  },
  {
    name: "Sausage Crumble (Lunch)",
    icon: "fa-circle",
    usedIn: "Lunch — Beans & Rice · Pasta w/ Meat Sauce",
    servingSize: "2 oz",
    vendors: {
      pfg: {
        label: "PFG", pack: "6/5 LB", casePrice: 63.50, perLb: 2.12, perServing: 0.27,
        note: "Verify current contract price", status: "current", priceVerified: false,
        ref: { sourceDoc: "PFG Invoice #6776963", sourceDate: "April 7, 2026",
               itemDesc: "Sausage Link/Crumble 6/5 LB — est. from PFG contract",
               calcDetail: "$63.50 case ÷ 30 LB = $2.12/lb · 2 oz serving = $0.27",
               caveat: "Price estimate — confirm current contract rate." }
      },
      shaver: {
        label: "Shaver", pack: "6/5 LB", casePrice: 61.08, perLb: 2.04, perServing: 0.26,
        note: "Sausage Hot Link / Polish FC · ISP", status: "best", priceVerified: true,
        ref: { sourceDoc: "Shaver ISP Price List", sourceDate: "March 1–31, 2026",
               itemDesc: "Sausage Hot Link or Polish FC  |  6/5 LB case (30 LB)",
               calcDetail: "$61.08 case ÷ 30 LB = $2.04/lb · 2 oz serving = $0.26" }
      },
      bigDaddy: {
        label: "Big Daddy", pack: "Bulk", casePrice: null, perLb: null, perServing: null,
        note: "Request bulk quote", status: "quote", priceVerified: false,
        ref: null
      }
    }
  },
  {
    name: "Burger Patty",
    icon: "fa-circle",
    usedIn: "Dinner — Burger Patty Sandwich (2× / week)",
    servingSize: "1 patty (3.2 oz)",
    vendors: {
      pfg: {
        label: "PFG", pack: "Per unit", casePrice: null, perLb: null, perServing: 0.45,
        note: "$0.45 each — verify case qty & price", status: "available", priceVerified: false,
        ref: { sourceDoc: "PFG (unconfirmed quote)", sourceDate: "Pending verification",
               itemDesc: "Burger Patty — unit price only, no case invoice on file",
               calcDetail: "Unit price: $0.45/patty — case quantity and total not confirmed",
               caveat: "No PFG invoice on file for this item. Verify case size, case price, and current availability before comparing." }
      },
      shaver: {
        label: "Shaver", pack: "Contact", casePrice: null, perLb: null, perServing: null,
        note: "Request current quote", status: "quote", priceVerified: false,
        ref: null
      },
      bigDaddy: {
        label: "Big Daddy", pack: "20 LB / 100 ct", casePrice: 45.00, perLb: 2.25, perServing: 0.45,
        note: "FG-BC/TVP-20-3.2 · 3.2oz patty · 100/case · S.O. BA24865", status: "current", priceVerified: true,
        ref: { sourceDoc: "Big Daddy Foods S.O. BA24865", sourceDate: "April 9, 2026",
               itemDesc: "FG-BC/TVP-20-3.2 — Ground Beef / Chicken / Soy Patty  |  20 LB / 100 patties per case · 10 cases ordered",
               calcDetail: "$45.00 case ÷ 100 patties = $0.45/patty · 3.2 oz each",
               invoiceLineTotal: "$450.00 (10 cases × $45.00)",
               bdInvoiceSection: true }
      }
    }
  },
  {
    name: "Ground Beef w/ TVP (Lunch)",
    icon: "fa-circle",
    usedIn: "Lunch — Beans & Rice · Mac & Cheese · Pasta",
    servingSize: "2 oz",
    vendors: {
      pfg: {
        label: "PFG", pack: "Contact", casePrice: null, perLb: null, perServing: null,
        note: "Not in current PFG order — request quote", status: "quote", priceVerified: false,
        ref: null
      },
      shaver: {
        label: "Shaver", pack: "Contact", casePrice: null, perLb: null, perServing: null,
        note: "Not in current ISP — request quote", status: "quote", priceVerified: false,
        ref: null
      },
      bigDaddy: {
        label: "Big Daddy", pack: "4/10 LB", casePrice: 107.60, perLb: 2.69, perServing: 0.34,
        note: "SEP-4/10 · Ground Beef w/ TVP · 40 LB · S.O. BA24865", status: "current", priceVerified: true,
        ref: { sourceDoc: "Big Daddy Foods S.O. BA24865", sourceDate: "April 9, 2026",
               itemDesc: "SEP-4/10 — Ground Beef with TVP  |  4/10 LB case (40 LB) · 50 cases ordered",
               calcDetail: "$107.60 case ÷ 40 LB = $2.69/lb · 2 oz serving = $0.336 → $0.34",
               invoiceLineTotal: "$5,380.00 (50 cases × $107.60)",
               bdInvoiceSection: true }
      }
    }
  },
  {
    name: "Pancakes (Breakfast)",
    icon: "fa-circle",
    usedIn: "Breakfast — Golden Brown Pancakes (2/serving)",
    servingSize: "2 pancakes (2.5 oz)",
    vendors: {
      pfg: {
        label: "PFG", pack: "Contact", casePrice: null, perLb: null, perServing: null,
        note: "Not in current PFG order — request quote", status: "quote", priceVerified: false,
        ref: null
      },
      shaver: {
        label: "Shaver", pack: "Contact", casePrice: null, perLb: null, perServing: null,
        note: "Not in current ISP — request quote", status: "quote", priceVerified: false,
        ref: null
      },
      bigDaddy: {
        label: "Big Daddy", pack: "144 ct / 11.25 LB", casePrice: 38.00, perLb: 3.38, perServing: 0.53,
        note: "GSS MF 7000 · IQF Golden Brown · S.O. BA24865", status: "current", priceVerified: true,
        ref: { sourceDoc: "Big Daddy Foods S.O. BA24865", sourceDate: "April 9, 2026",
               itemDesc: "GSS MF 7000 — IQF Golden Brown Pancakes 1.25 oz each  |  144 ct / 11.25 LB · 20 cases ordered",
               calcDetail: "$38.00 case ÷ 144 units = $0.264/pancake · 2 pancakes/serving = $0.528 → $0.53",
               invoiceLineTotal: "$760.00 (20 cases × $38.00)",
               bdInvoiceSection: true }
      }
    }
  }
];

/* ============================================================
   BIG DADDY FOODS — INVOICE S.O. BA24865  (4/9/2026)
   Every monetary value computed: $/case · $/lb · $/2oz · $/3oz · $/4oz
   Annual savings vs PFG/Shaver calculated at 300-inmate baseline.
   ============================================================ */
const BIG_DADDY_INVOICE = {
  vendor:      "Big Daddy Foods, Inc.",
  soNumber:    "BA24865",
  invoiceDate: "4/9/2026",
  shipDate:    "4/15/2026",
  dueDate:     "4/29/2026",
  terms:       "14 days",
  total:       8728.40,
  items: [
    {
      code:          "PP90377",
      description:   "Seasoned Breast Nuggets",
      pack:          "6/6 LB",
      lbsPerCase:    36,
      casesOrdered:  40,
      casePrice:     53.46,
      lineTotal:     2138.40,
      totalLbs:      1440,
      perLb:         1.485,
      per2oz:        0.186,
      per3oz:        0.278,
      per4oz:        0.371,
      servPerCase:   { "2oz": 288, "3oz": 192, "4oz": 144 },
      totalServings: { "2oz": 11520, "3oz": 7680, "4oz": 5760 },
      menuUse:       "Dinner — Chicken protein (Chicken Nugget Plate)",
      menuNote:      "Best chicken price — $0.13 cheaper/serving than Shaver",
      vs: [
        { label: "Shaver Chicken Patty", perServing: 0.41, savings: 0.132, pct: 32,
          annual300: Math.round(0.132 * 300 * 2 * 52) },
        { label: "PFG Chicken Patty",    perServing: 0.42, savings: 0.142, pct: 34,
          annual300: Math.round(0.142 * 300 * 2 * 52) }
      ]
    },
    {
      code:          "SEP-4/10",
      description:   "Ground Beef w/ TVP",
      pack:          "4/10 LB",
      lbsPerCase:    40,
      casesOrdered:  50,
      casePrice:     107.60,
      lineTotal:     5380.00,
      totalLbs:      2000,
      perLb:         2.690,
      per2oz:        0.336,
      per3oz:        0.504,
      per4oz:        0.673,
      servPerCase:   { "2oz": 320, "3oz": 213, "4oz": 160 },
      totalServings: { "2oz": 16000, "3oz": 10650, "4oz": 8000 },
      menuUse:       "Lunch — Ground Beef protein (Beans & Rice · Mac · Pasta)",
      menuNote:      "Only current source — adds beef variety to lunch rotation",
      vs:            []
    },
    {
      code:          "GSS MF 7000",
      description:   "IQF Golden Brown Pancakes (1.25 oz each)",
      pack:          "144 ct / 11.25 LB",
      lbsPerCase:    11.25,
      countPerCase:  144,
      casesOrdered:  20,
      casePrice:     38.00,
      lineTotal:     760.00,
      totalLbs:      225,
      totalUnits:    2880,
      perLb:         3.378,
      perUnit:       0.264,
      per2pc:        0.528,
      per3pc:        0.792,
      servPerCase:   { "2pc": 72, "3pc": 48 },
      totalServings: { "2pc": 1440, "3pc": 960 },
      menuUse:       "Breakfast — Pancake base (pair with sausage patty)",
      menuNote:      "Ready-to-heat IQF — zero prep, adds variety to breakfast",
      vs:            []
    },
    {
      code:          "FG-BC/TVP-20-3.2",
      description:   "Ground Beef / Chicken / Soy Patty (3.2 oz)",
      pack:          "20 LB / 100 patties",
      lbsPerCase:    20,
      countPerCase:  100,
      casesOrdered:  10,
      casePrice:     45.00,
      lineTotal:     450.00,
      totalLbs:      200,
      totalUnits:    1000,
      perLb:         2.250,
      perUnit:       0.450,
      per2oz:        0.281,
      per3oz:        0.422,
      per4oz:        0.563,
      servPerCase:   { "1 patty": 100 },
      totalServings: { "1 patty": 1000 },
      menuUse:       "Dinner — Burger Patty Sandwich (2× per week in rotation)",
      menuNote:      "Confirmed $0.45/patty · matches PFG unconfirmed price",
      vs: [
        { label: "PFG (unconfirmed)", perServing: 0.45, savings: 0.00, pct: 0,
          annual300: 0 }
      ]
    }
  ]
};

/* ============================================================
   MEAL ALTERNATIVES  —  shown as swap chips in the menu grid
   Each cell displays these as quick-reference protein options.
   ============================================================ */
const MEAL_ALTS = {
  breakfast: [
    { main: "Grits + Sausage Patty",       protein: "Sausage",        cost: "$0.52", vendor: "" },
    { main: "Oatmeal + Boiled Eggs",       protein: "Eggs",           cost: "$0.48", vendor: "" },
    { main: "Eggs Scrambled + Sausage",    protein: "Eggs & Sausage", cost: "$0.55", vendor: "" },
    { main: "Grits + Boiled Eggs",         protein: "Eggs",           cost: "$0.45", vendor: "" },
    { main: "Pancakes + Sausage Patty",    protein: "Pancakes (BD)",  cost: "$0.68", vendor: "BD" }
  ],
  lunch: [
    { main: "Pinto Beans & Rice + Sausage",      protein: "Sausage",       cost: "$0.65", vendor: "" },
    { main: "Mac & Cheese + Bologna",            protein: "Bologna",       cost: "$0.65", vendor: "" },
    { main: "Pasta w/ Meat Sauce",               protein: "Sausage",       cost: "$0.65", vendor: "" },
    { main: "Northern Beans & Rice + Sausage",   protein: "Sausage",       cost: "$0.65", vendor: "" },
    { main: "Mashed Potatoes & Gravy + Sausage", protein: "Sausage",       cost: "$0.68", vendor: "" },
    { main: "Pasta & Veg + Bologna",             protein: "Bologna",       cost: "$0.62", vendor: "" },
    { main: "Beans & Rice + Ground Beef",        protein: "Ground Beef",   cost: "$0.68", vendor: "BD" },
    { main: "Mac & Cheese + Ground Beef",        protein: "Ground Beef",   cost: "$0.68", vendor: "BD" }
  ],
  dinner: [
    { main: "Turkey Sandwich",          protein: "Turkey",         cost: "$0.72", vendor: "" },
    { main: "Salami Sandwich",          protein: "Salami",         cost: "$0.65", vendor: "" },
    { main: "Chicken Patty Sandwich",   protein: "Chicken Patty",  cost: "$0.78", vendor: "" },
    { main: "Chicken Nugget Plate",     protein: "Chicken (BD)",   cost: "$0.55", vendor: "BD" },
    { main: "Burger Patty Sandwich",    protein: "Burger Patty",   cost: "$0.62", vendor: "BD" },
    { main: "PB&J + Boiled Egg",        protein: "PB & Egg",       cost: "$0.62", vendor: "" }
  ]
};

/* ============================================================
   MENU ORDER LIST — 4-WEEK CYCLE · 300 INMATES
   Pre-calculated quantities per vendor based on the MENU_ROTATION.
   Serving sizes: proteins 2–3 oz, veg 4 oz, starches 1.5–2.5 oz dry.
   Vegetable appearances: P&C 21x · Green Beans 18x · Mixed Veg 17x
   ============================================================ */
const MENU_ORDER_LIST = {
  basis: { inmates: 300, days: 28, perInmatePerDay: 2.76, grandTotal: 23222.35 },
  vendors: [
    {
      key: "shaver",
      label: "Shaver Foods",
      subtitle: "ISP Price List · Mar 1–31, 2026",
      total: 18934.17,
      categories: [
        {
          name: "Proteins",
          icon: "fa-drumstick-bite",
          items: [
            { name: "Sausage Bkfst Patty FC 1oz",  pack: "40 LB",    qty: 15,  unit: "cases", casePrice: 82.54,  total: 1237.10, basis: "16 bfast days · 4,800 servings" },
            { name: "Sausage Hot Link FC",          pack: "6/5 LB",  qty: 24,  unit: "cases", casePrice: 61.08,  total: 1465.92, basis: "19 lunch days · 5,700 servings" },
            { name: "Bologna Logs Chik",            pack: "3/8 LB",  qty: 15,  unit: "cases", casePrice: 39.02,  total: 585.30,  basis: "9 lunch days · 2,700 servings" },
            { name: "Salami Logs Chik",             pack: "2/10 LB", qty: 8,   unit: "cases", casePrice: 31.82,  total: 254.56,  basis: "4 dinner days · 1,200 servings" },
            { name: "Chicken Patty BRD FC 3oz",     pack: "40 LB",   qty: 12,  unit: "cases", casePrice: 86.29,  total: 1035.48, basis: "8 dinner days · 2,400 servings" }
          ]
        },
        {
          name: "Starches & Dry Goods",
          icon: "fa-wheat-awn",
          items: [
            { name: "Grits Quick White",            pack: "50 LB",   qty: 7,   unit: "bags",  casePrice: 28.00,  total: 196.00,  basis: "12 bfast days · 338 lbs dry" },
            { name: "Oats Quick",                   pack: "50 LB",   qty: 5,   unit: "bags",  casePrice: 28.33,  total: 141.65,  basis: "8 bfast days · 225 lbs dry" },
            { name: "Bread White Slice",            pack: "12/28oz", qty: 128, unit: "cases", casePrice: 29.06,  total: 3719.68, basis: "Bfast 2 sl + dinner 2 sl · 33,600 slices" },
            { name: "Cornbread Mix Southern",       pack: "50 LB",   qty: 32,  unit: "bags",  casePrice: 39.02,  total: 1248.64, basis: "Lunch ×2 + dinner ×1 every day · 25,200 pcs" },
            { name: "Pasta Elbow Mac",              pack: "2/10 LB", qty: 12,  unit: "cases", casePrice: 13.10,  total: 157.20,  basis: "5 Mac & Cheese lunch days" },
            { name: "Pasta Rotini",                 pack: "2/10 LB", qty: 19,  unit: "cases", casePrice: 13.73,  total: 260.87,  basis: "8 Pasta lunch days" },
            { name: "Potato Dehy Flakes",           pack: "40 LB",   qty: 5,   unit: "bags",  casePrice: 51.62,  total: 258.10,  basis: "5 Mashed Potato days" },
            { name: "Rice White",                   pack: "50 LB",   qty: 8,   unit: "bags",  casePrice: 25.06,  total: 200.48,  basis: "10 Beans & Rice days" },
            { name: "Great Northern Beans Dry",     pack: "50 LB",   qty: 5,   unit: "bags",  casePrice: 39.00,  total: 195.00,  basis: "6 Northern Beans & Rice days" }
          ]
        },
        {
          name: "Vegetables (Frozen)",
          icon: "fa-leaf",
          items: [
            { name: "Peas and Carrots Frozen",      pack: "30 LB",   qty: 53,  unit: "bags",  casePrice: 29.77,  total: 1577.81, basis: "21 meal-appearances · 1,575 lbs" },
            { name: "Beans Green Cut Frozen",       pack: "30 LB",   qty: 45,  unit: "bags",  casePrice: 33.06,  total: 1487.70, basis: "18 meal-appearances · 1,350 lbs" },
            { name: "Mixed Vegetables Blend",       pack: "30 LB",   qty: 43,  unit: "bags",  casePrice: 26.75,  total: 1150.25, basis: "17 meal-appearances · 1,275 lbs" }
          ]
        },
        {
          name: "Pantry & Condiments",
          icon: "fa-jar",
          items: [
            { name: "Cake Mix Yellow",              pack: "50 LB",   qty: 42,  unit: "bags",  casePrice: 40.42,  total: 1697.64, basis: "Every lunch + dinner · 56 appearances" },
            { name: "Cheese Sauce",                 pack: "6/#10",   qty: 8,   unit: "cases", casePrice: 48.12,  total: 384.96,  basis: "5 Mac & Cheese days" },
            { name: "Tomato Sauce",                 pack: "6/#10",   qty: 6,   unit: "cases", casePrice: 28.89,  total: 173.34,  basis: "4 Pasta w/ Meat Sauce days" },
            { name: "Jelly Assorted LC",            pack: "200 ea",  qty: 42,  unit: "cases", casePrice: 9.53,   total: 400.26,  basis: "Every breakfast · 8,400 packets" },
            { name: "Drink Mix",                    pack: "1000/1gm",qty: 9,   unit: "cases", casePrice: 20.63,  total: 185.67,  basis: "Every breakfast · 8,400 packets" },
            { name: "Margarine Solid",              pack: "30/1 LB", qty: 4,   unit: "cases", casePrice: 38.46,  total: 153.84,  basis: "Baking + service — est." },
            { name: "Fry Oil Clear",                pack: "35 LB",   qty: 10,  unit: "cases", casePrice: 35.07,  total: 350.70,  basis: "4-week cooking supply — est." },
            { name: "Gravy Mix Country",            pack: "6/3 LB",  qty: 11,  unit: "cases", casePrice: 37.82,  total: 416.02,  basis: "5 Mashed Potatoes & Gravy days" }
          ]
        }
      ]
    },
    {
      key: "bigDaddy",
      label: "Big Daddy Foods",
      subtitle: "S.O. BA24865 · Apr 9, 2026",
      total: 1080.00,
      categories: [
        {
          name: "Proteins",
          icon: "fa-drumstick-bite",
          items: [
            { name: "Burger Patty — FG-BC/TVP-20-3.2", pack: "20 LB / 100 ct", qty: 24, unit: "cases", casePrice: 45.00, total: 1080.00, basis: "8 dinner days · 2,400 patties" }
          ]
        }
      ]
    },
    {
      key: "pfg",
      label: "PFG (Keep)",
      subtitle: "Invoice #6776963 · Apr 7, 2026",
      total: 3208.18,
      categories: [
        {
          name: "Proteins",
          icon: "fa-drumstick-bite",
          items: [
            { name: "Turkey Deli",       pack: "2/10 LB", qty: 23, unit: "cases", casePrice: 52.00, total: 1196.00, basis: "8 dinner days · 450 lbs", caveat: "Estimated price — verify current contract rate" },
            { name: "Shell Eggs Grade A",pack: "15 doz",  qty: 67, unit: "cases", casePrice: 28.50, total: 1909.50, basis: "20 bfast days · 12,000 eggs",  caveat: "Market price — verify weekly before ordering" }
          ]
        },
        {
          name: "Dry Goods",
          icon: "fa-bag-shopping",
          items: [
            { name: "Pinto Beans Dry",   pack: "50 LB",   qty: 4,  unit: "bags",  casePrice: 25.67, total: 102.68,  basis: "5 Pinto Beans days — PFG $3.48/bag cheaper than Shaver" }
          ]
        }
      ]
    }
  ]
};

// ============================================================
//  CAFÉ ANALYSIS DATA
// ============================================================
const CAFE_DATA = {
  headcount: { birmingham: 240, bessemer: 150 },
  ratePerMeal: 3.03,
  // Birmingham revenue = Café ($5,090.40) + Academy ($2,545.20) + JBS ($2,019.00) = $9,654.60
  revWeekly:   { birmingham: 9654.60, bessemer: 3181.50 },
  targetFoodCostPct: 0.30,

  // 14 weeks of actual COGS from Weekly - 2026.xlsx
  // Birmingham % = birmCogs / $9,654.60 (Café + Academy + JBS combined revenue)
  weeklyFinancials: [
    { week: "Jan 5–11",      birmCogs: 3823.76, birmPct: 0.396, besCogs: 1602.15, besPct: 0.504 },
    { week: "Jan 12–18",     birmCogs: 4123.69, birmPct: 0.427, besCogs: 1250.00, besPct: 0.393 },
    { week: "Jan 19–25",     birmCogs: 4080.81, birmPct: 0.423, besCogs: 2858.77, besPct: 0.899 },
    { week: "Jan 26–Feb 1",  birmCogs: 3407.27, birmPct: 0.353, besCogs: 1121.81, besPct: 0.353 },
    { week: "Feb 2–8",       birmCogs: 3693.02, birmPct: 0.383, besCogs: 1930.28, besPct: 0.607 },
    { week: "Feb 9–15",      birmCogs: 4388.84, birmPct: 0.455, besCogs: 1871.05, besPct: 0.588 },
    { week: "Feb 16–22",     birmCogs: 3925.87, birmPct: 0.407, besCogs: 1555.88, besPct: 0.489 },
    { week: "Feb 23–Mar 1",  birmCogs: 3959.31, birmPct: 0.410, besCogs: 2041.99, besPct: 0.642 },
    { week: "Mar 2–8",       birmCogs: 4756.79, birmPct: 0.493, besCogs: 2206.71, besPct: 0.694 },
    { week: "Mar 9–15",      birmCogs: 4055.17, birmPct: 0.420, besCogs: 1559.41, besPct: 0.490 },
    { week: "Mar 16–22",     birmCogs: 4682.47, birmPct: 0.485, besCogs: 1924.02, besPct: 0.605 },
    { week: "Mar 23–29",     birmCogs: 4470.41, birmPct: 0.463, besCogs: 1965.66, besPct: 0.618 },
    { week: "Mar 30–Apr 5",  birmCogs: 3940.89, birmPct: 0.408, besCogs: 2229.27, besPct: 0.701 },
    { week: "Apr 6–12",      birmCogs: 4298.01, birmPct: 0.445, besCogs: 2219.01, besPct: 0.697 }
  ],

  // Per-serving ingredient cost analysis
  ingredients: [
    { item: "Shell Eggs (3 eggs/serving)",    category: "Protein",   pfgCost: 0.22,  shaverCost: null,  frequency: "Daily — all 7 days",               status: "known",      note: "PFG $26.77/360 eggs" },
    { item: "Bacon (2–3 strips)",             category: "Protein",   pfgCost: null,  shaverCost: null,  frequency: "Mon / Wed / Fri breakfast",         status: "needsPrice", estimated: 0.40, note: "High-cost — needs contracted price ASAP" },
    { item: "Sausage Patty",                  category: "Protein",   pfgCost: 0.22,  shaverCost: null,  frequency: "Tue / Thu / Sat / Sun breakfast",   status: "known" },
    { item: "Pork Sausage Links",             category: "Protein",   pfgCost: null,  shaverCost: null,  frequency: "Tue (Wk 2–3) breakfast",            status: "needsPrice", estimated: 0.28 },
    { item: "Grits",                          category: "Starch",    pfgCost: 0.070, shaverCost: 0.056, frequency: "Daily breakfast",                   status: "known",      shaverSavings: 0.014 },
    { item: "Oatmeal",                        category: "Starch",    pfgCost: 0.080, shaverCost: 0.057, frequency: "Daily breakfast",                   status: "known",      shaverSavings: 0.023 },
    { item: "Biscuit",                        category: "Starch",    pfgCost: 0.23,  shaverCost: null,  frequency: "Mon / Sat / Sun + others",          status: "known" },
    { item: "Pancakes (2) w/ Syrup",          category: "Starch",    pfgCost: 0.26,  shaverCost: null,  frequency: "Tue (Wk 1, 2, 3) breakfast",       status: "known" },
    { item: "Waffles w/ Syrup",               category: "Starch",    pfgCost: null,  shaverCost: null,  frequency: "Fri (Wk 1, 2, 3) breakfast",       status: "needsPrice", estimated: 0.26 },
    { item: "French Toast w/ Syrup",          category: "Starch",    pfgCost: null,  shaverCost: null,  frequency: "Tue (Wk 2–3) / Mon (Wk 1)",        status: "needsPrice", estimated: 0.25 },
    { item: "Breakfast Potatoes",             category: "Starch",    pfgCost: null,  shaverCost: null,  frequency: "Mon / Sat / Sun / Thu breakfast",   status: "needsPrice", estimated: 0.20, note: "Hashbrowns in PFG catalog $23.24/2×10# — verify per-serving" },
    { item: "Cinnamon Rolls w/ Icing",        category: "Bakery",    pfgCost: null,  shaverCost: null,  frequency: "Thu (Wk 4) breakfast",              status: "needsPrice", estimated: 0.30 },
    { item: "Fresh Fruit (orange + banana)",  category: "Produce",   pfgCost: null,  shaverCost: null,  frequency: "Daily — every breakfast",           status: "needsPrice", estimated: 0.55, note: "LARGEST single cost driver. Get produce contract immediately." },
    { item: "Loaf Bread",                     category: "Starch",    pfgCost: 0.07,  shaverCost: null,  frequency: "Daily breakfast",                   status: "known" },
    { item: "Jelly Packet",                   category: "Condiment", pfgCost: 0.076, shaverCost: 0.048, frequency: "Breakfast (biscuit days)",           status: "known",      shaverSavings: 0.028 },
    { item: "Chicken Tenders (4 oz)",         category: "Protein",   pfgCost: null,  shaverCost: null,  frequency: "Mon lunch — Wk 1, 2, 3",           status: "needsPrice", estimated: 1.25, note: "Most expensive item on cafe menu." },
    { item: "Fried / Baked Fish (4 oz)",      category: "Protein",   pfgCost: null,  shaverCost: null,  frequency: "Every Friday",                      status: "needsPrice", estimated: 0.85 },
    { item: "Burger Patty (3.2 oz)",          category: "Protein",   pfgCost: 0.45,  shaverCost: 0.45,  frequency: "~2 days/4-wk",                      status: "known",      note: "Big Daddy FG-BC/TVP-20-3.2 at $0.45/patty" },
    { item: "Chicken Patty BRD 3oz",          category: "Protein",   pfgCost: 0.43,  shaverCost: 0.36,  frequency: "~2 days/4-wk dinner",               status: "known",      shaverSavings: 0.072 },
    { item: "Hot Dog",                        category: "Protein",   pfgCost: null,  shaverCost: null,  frequency: "~3 days/4-wk",                      status: "needsPrice", estimated: 0.18 },
    { item: "Pork Chop Sandwich",             category: "Protein",   pfgCost: null,  shaverCost: null,  frequency: "Tue (Wk 2, 4) lunch",              status: "needsPrice", estimated: 0.70 },
    { item: "Fried Chicken (pieces)",         category: "Protein",   pfgCost: null,  shaverCost: null,  frequency: "Multiple days/4-wk",                status: "needsPrice", estimated: 0.65 },
    { item: "French Fries (4 oz portion)",    category: "Side",      pfgCost: null,  shaverCost: null,  frequency: "Daily lunch — most days",           status: "needsPrice", estimated: 0.28, note: "High frequency. Needs price + portion standard urgently." },
    { item: "Hushpuppies",                    category: "Side",      pfgCost: null,  shaverCost: null,  frequency: "Wed lunch (fish days)",             status: "needsPrice", estimated: 0.12 },
    { item: "Dinner Roll",                    category: "Starch",    pfgCost: null,  shaverCost: null,  frequency: "Multiple days/week",                status: "needsPrice", estimated: 0.10 },
    { item: "Salad Bar — Full Daily",         category: "Produce",   pfgCost: null,  shaverCost: null,  frequency: "Every meal — 3x/day",              status: "needsPrice", estimated: 0.60, note: "Running 3x/day = triple the produce turnover. Lunch-only recommended." },
    { item: "Cheese Sauce",                   category: "Condiment", pfgCost: 0.054, shaverCost: 0.045, frequency: "Multiple days",                     status: "known",      shaverSavings: 0.009 },
    { item: "Mashed Potatoes",                category: "Side",      pfgCost: 0.163, shaverCost: null,  frequency: "~3 days/week",                      status: "known" },
    { item: "Yellow Cake / Dessert",          category: "Bakery",    pfgCost: 0.08,  shaverCost: 0.065, frequency: "Daily dessert",                     status: "known",      shaverSavings: 0.015 },
    { item: "Cobbler (Peach / Apple)",        category: "Bakery",    pfgCost: null,  shaverCost: null,  frequency: "~2 days/wk dessert",               status: "needsPrice", estimated: 0.18 },
    { item: "Banana Pudding",                 category: "Bakery",    pfgCost: null,  shaverCost: null,  frequency: "~1 day/wk dessert",                status: "needsPrice", estimated: 0.15 },
    { item: "Fresh Baked Cookies",            category: "Bakery",    pfgCost: null,  shaverCost: null,  frequency: "~3 days/wk dessert",               status: "needsPrice", estimated: 0.12 }
  ],

  // Priority cost-reduction opportunities ranked by estimated annual impact
  opportunities: [
    {
      rank: 1,
      title: "Get a Produce Contract for Fresh Fruit",
      detail: "Fresh fruit (orange + banana) is served EVERY breakfast to 390 people. At ~$0.55/person/day that's $78,000/year just in fruit. A produce vendor contract could cut this to $0.25–0.30/person/day.",
      weeklyLow: 676, weeklyHigh: 910,
      annualLow: 35000, annualHigh: 47000,
      priority: "critical",
      icon: "fa-apple-whole",
      action: "Get quotes from Shaver produce section, Sysco, or local produce distributor. Standing weekly order on whole oranges (3/4 bushel) and bananas (40 lb case)."
    },
    {
      rank: 2,
      title: "Replace Chicken Tenders → Shaver Chicken Patty",
      detail: "Tenders cost ~$1.25/serving vs Shaver BRD Chicken Patty at $0.36. Served Monday lunch in 3 of 4 weeks to 390 people = ~1,170 servings/cycle. Switching saves ~$1,040/month.",
      weeklyLow: 260, weeklyHigh: 300,
      annualLow: 13500, annualHigh: 15600,
      priority: "high",
      icon: "fa-drumstick-bite",
      action: "Use Shaver 'Chicken Patty BRD FC 3oz' (40 LB, $86.29/cs) for Mon lunch. Serve on dinner roll as chicken sandwich to maintain appeal."
    },
    {
      rank: 3,
      title: "Limit Salad Bar to Lunch Only",
      detail: "Full salad bar (chef, garden, pasta, chicken salad, Jell-O) runs at all 3 meals every day. That's 3× the produce turnover and waste. Restricting to lunch only saves ~$0.40/person/day at breakfast and dinner.",
      weeklyLow: 200, weeklyHigh: 400,
      annualLow: 10400, annualHigh: 20800,
      priority: "high",
      icon: "fa-leaf",
      action: "Remove salad bar from breakfast and dinner. Offer a pre-portioned 4 oz garden salad cup at dinner instead."
    },
    {
      rank: 4,
      title: "Standardize French Fry Portions",
      detail: "Fries appear at nearly every lunch. Without a portion standard, over-serving waste compounds daily. A #8 scoop (4 oz) standard can reduce over-serving by 20–25% with zero menu change.",
      weeklyLow: 55, weeklyHigh: 100,
      annualLow: 2860, annualHigh: 5200,
      priority: "med",
      icon: "fa-bowl-food",
      action: "Establish 4 oz as the standard portion. Confirm fry case cost, divide by 4 oz servings per case = exact per-serving cost for budget tracking."
    },
    {
      rank: 5,
      title: "Switch Overlapping Items to Shaver",
      detail: "Cafe uses the same grits, oatmeal, cake mixes, jelly, and cheese sauce as population — all available cheaper at Shaver. Apply the existing population switch list to cafe purchasing.",
      weeklyLow: 70, weeklyHigh: 110,
      annualLow: 3640, annualHigh: 5720,
      priority: "med",
      icon: "fa-arrows-rotate",
      action: "Add cafe to the Shaver ISP order. Grits alone: $0.014/serving × 390 × 7 days = $38/week savings."
    },
    {
      rank: 6,
      title: "Reduce Breakfast Egg Variety (3 styles → 1/day)",
      detail: "Scrambled, fried, AND boiled eggs are all served simultaneously every morning. This triples prep time and increases waste. Rotating one style per day reduces breakage and labor.",
      weeklyLow: 40, weeklyHigh: 70,
      annualLow: 2080, annualHigh: 3640,
      priority: "low",
      icon: "fa-egg",
      action: "Mon/Wed/Fri: scrambled. Tue/Thu: fried. Sat/Sun: boiled. One prep pan per morning instead of three."
    }
  ],

  // ── Bessemer Action Plan ────────────────────────────────────
  // Target: reduce avg COGS from 59.1% → 55% on $3,181.50/week revenue
  // Gap: $131/week · $6,800/year · current max COGS target = $1,750/week
  bessemerPlan: {
    summary: {
      currentPct: 0.591,
      targetPct:  0.550,
      revWeekly:  3181.50,
      maxCogsTarget:  1749.83,   // 55% of $3,181.50
      currentCogsAvg: 1879.00,   // 59.1% of $3,181.50
      gapWeekly:  129.17,
      gapAnnual:  6717
    },
    // Key insight: revenue is perfectly flat every week ($3,181.50).
    // COGS variance is 35.3% (low: $1,122) to 89.9% (high: $2,859) — a 54-point swing.
    // This means the kitchen CAN hit 55% target already (see Jan 12 at 39.3%, Jan 26 at 35.3%).
    // The problem is ordering discipline, not menu cost.
    insight: "Bessemer's revenue is perfectly flat at $3,181.50 every week. COGS swings from $1,122 (35.3%) to $2,859 (89.9%) — a 54-point variance on fixed revenue. Three weeks are already at or below 55%. The menu can hit the target; ordering consistency cannot.",
    steps: [
      {
        step: 1,
        priority: "critical",
        title: "Set a Weekly COGS Cap of $1,750",
        icon: "fa-hand-holding-dollar",
        detail: "55% of $3,181.50 weekly revenue = $1,749.83 max COGS. Make this the weekly purchase authority limit for Bessemer. No order can be placed that would push the running week's COGS above $1,750. The manager signs off on each order against the week's remaining budget.",
        weeklyImpact: 129,
        annualImpact: 6717,
        effort: "Immediate — policy only, no cost",
        how: "Post the $1,750 weekly cap on the ordering station. Track running total each order day. If a week is already at $1,400 and Thursday needs supplies, that's $350 left to spend — not a new $700 order."
      },
      {
        step: 2,
        priority: "critical",
        title: "Eliminate Bulk/Double Orders",
        icon: "fa-boxes-stacked",
        detail: "The Jan 19 week at 89.9% COGS ($2,859) and several 69–70% weeks indicate ordering for multiple weeks in a single billing period. A $2,859 week on $3,181.50 revenue means nearly every dollar in revenue went to food. This is a double-order pattern, not a double-cost menu.",
        weeklyImpact: 200,
        annualImpact: null,
        effort: "Immediate — discipline only",
        how: "Order weekly. If supplies run low mid-week, that's a signal to refine par levels — not a green light to over-order the next week. Implement a sign-off requirement for any single order over $500."
      },
      {
        step: 3,
        priority: "high",
        title: "Build Par Levels for Top 10 Items",
        icon: "fa-clipboard-list",
        detail: "Without written par levels, ordering is based on gut feel. The high-variance weeks suggest the kitchen is guessing quantities. Par levels establish a floor (reorder point) and ceiling (max stock) for each item so the fridge and dry storage dictate the order, not memory.",
        weeklyImpact: 80,
        annualImpact: 4160,
        effort: "1–2 days to establish, permanent benefit",
        how: "Walk the Bessemer kitchen and document: (1) items used every day, (2) approximate daily usage, (3) how many days of supply currently on hand. Set par = 5-day supply on daily items, 7-day supply on weekly proteins. Reorder only when below par, only to par ceiling."
      },
      {
        step: 4,
        priority: "high",
        title: "Switch to Shaver for 5 Key Items",
        icon: "fa-arrows-rotate",
        detail: "Bessemer sources the same grits, oatmeal, jelly, cake mixes, and cheese sauce as Birmingham — all available cheaper at Shaver. Adding Bessemer to the existing Shaver ISP order requires zero new vendor setup.",
        weeklyImpact: 35,
        annualImpact: 1820,
        effort: "Add Bessemer to existing Shaver order — 1 phone call",
        how: "Grits: $0.014/serving savings × 150 people × 7 days = $14.70/week. Oatmeal: $0.023/serving × 150 × 7 = $24.15/week. Jelly packets: $0.028 × ~75 × 5 = $10.50/week. Total: ~$35+/week on existing menu with no changes."
      },
      {
        step: 5,
        priority: "med",
        title: "Standardize French Fry Portion to 4 oz",
        icon: "fa-bowl-food",
        detail: "Fries appear at nearly every Bessemer lunch. Without a written portion standard, a 5–6 oz plate vs a 4 oz plate is a 25–50% cost overrun on the second highest frequency item. A #8 scoop costs nothing to implement.",
        weeklyImpact: 25,
        annualImpact: 1300,
        effort: "Zero cost — portion scoop and a posted standard",
        how: "Purchase one #8 scoop ($3). Post '4 oz — 1 level scoop' at the fry station. Track fry case usage for 2 weeks before vs 2 weeks after to confirm savings."
      },
      {
        step: 6,
        priority: "med",
        title: "Verify Produce Costs — Get Contracted Pricing",
        icon: "fa-apple-whole",
        detail: "Fresh fruit costs at Bessemer are unknown but estimated at $0.45–0.55/person/day × 150 people = $47–58/day, $329–406/week. A standing produce order with a contract price (whole oranges, 40 lb banana case) can cut this 30–40%.",
        weeklyImpact: 100,
        annualImpact: 5200,
        effort: "1 week to get produce quote and set standing order",
        how: "Get a per-case price on: (1) navel oranges, 3/4 bushel case, (2) bananas, 40 lb case. Calculate per-serving cost. Compare to current uncontracted spend. A standing weekly order typically commands 10–20% below spot price."
      }
    ],
    // Best weeks as proof-of-concept
    benchmarkWeeks: [
      { week: "Jan 12–18",    besPct: 0.393, besCogs: 1250.00, note: "39.3% — already well below 55% target" },
      { week: "Jan 26–Feb 1", besPct: 0.353, besCogs: 1121.81, note: "35.3% — lowest week, shows what's possible" },
      { week: "Feb 16–22",    besPct: 0.489, besCogs: 1555.88, note: "48.9% — strong week, target range" },
      { week: "Mar 9–15",     besPct: 0.490, besCogs: 1559.41, note: "49.0% — on target" }
    ]
  },

  // 4-week rotation (condensed — key proteins + items per meal)
  rotation: [
    {
      week: 1,
      days: [
        { day:"Mon", bfast:"Eggs · Bacon · Biscuit w/ Jelly · Grits · Oatmeal · Fruit",           lunch:"Chicken Tenders · French Fries · Salad Bar · Strawberry Cake",        dinner:"Baked Potato Bar · Grilled Chicken · Broccoli · Salad Bar · Cake" },
        { day:"Tue", bfast:"Eggs · Sausage Patty · French Toast · Grits · Oatmeal · Fruit",       lunch:"Grilled Burger · French Fries · Cheese Sauce · Salad Bar · Cookies",   dinner:"Fried Chicken · Mashed Potatoes · Green Beans · Gravy · Salad Bar · Cake" },
        { day:"Wed", bfast:"Eggs · Bacon · Pancakes w/ Syrup · Grits · Oatmeal · Fruit",          lunch:"Fried Wings · French Fries · Hushpuppies · Salad Bar · Peach Cobbler", dinner:"Baked Spaghetti · Butter Corn · Garlic Bread · Salad Bar · Cake" },
        { day:"Thu", bfast:"Eggs · Sausage Patty · Sausage Gravy · Grits · Oatmeal · Fruit",      lunch:"Baked Potato Bar · Broccoli · Cheese/Bacon · Salad Bar · Banana Pudding", dinner:"Taco Salad · Ground Beef · Lettuce/Tomato/Cheese · Salad Bar · Cookies" },
        { day:"Fri", bfast:"Eggs · Bacon · Waffles w/ Syrup · Grits · Oatmeal · Fruit",           lunch:"Fried Fish · Fries w/ Parmesan · Hushpuppies · Salad Bar · Choc Cake",  dinner:"Baked Fish · Mashed Potatoes · Sweet Peas · Dinner Roll · Salad Bar · Cake" },
        { day:"Sat", bfast:"Eggs · Sausage Patty · Biscuit w/ Jelly · Grits · Oatmeal · Fruit",   lunch:"Grilled Hotdogs · French Fries · Salad Bar · Yellow Cake",             dinner:"Fried Chicken Sandwich · French Fries · Salad Bar · Cookies" },
        { day:"Sun", bfast:"Eggs · Sausage Patty · Biscuit w/ Jelly · Grits · Oatmeal · Fruit",   lunch:"Chicken Alfredo · Broccoli · Dinner Roll · Salad Bar · Choc Cake",     dinner:"Baked Chicken w/ Gravy · Rice · Green Beans · Salad Bar · Cookies" }
      ]
    },
    {
      week: 2,
      days: [
        { day:"Mon", bfast:"Eggs · Bacon · Biscuit w/ Jelly · Grits · Oatmeal · Fruit",           lunch:"Chicken Tenders · French Fries · Salad Bar · Peach Cobbler",          dinner:"Baked Spaghetti · Butter Corn · Garlic Bread · Salad Bar · Choc Cake" },
        { day:"Tue", bfast:"Eggs · Pork Sausage · Pancakes w/ Syrup · Grits · Oatmeal · Fruit",   lunch:"Pork Chop Sandwich · French Fries · Bell Pepper/Onion · Salad Bar",    dinner:"Fried Chicken · Green Beans · Pinto Beans · Salad Bar · Yellow Cake" },
        { day:"Wed", bfast:"Eggs · Bacon · Sausage Gravy · Boiled Eggs · Grits · Oatmeal",        lunch:"Grilled Hamburger · French Fries · Cheese/Onion · Salad Bar · Straw Cake", dinner:"Taco Salad · Cheese · Lettuce/Tomato · Sour Kraut · Salad Bar · Cake" },
        { day:"Thu", bfast:"Eggs · Sausage Patty · Biscuit · Grits · Oatmeal · Fruit",            lunch:"Fried Chicken · Fries · Mashed Potatoes · Salad Bar · Choc Cake",      dinner:"Chicken Alfredo · Broccoli · Pasta · Salad Bar · Straw Cake" },
        { day:"Fri", bfast:"Eggs · Bacon · Waffles w/ Syrup · Grits · Oatmeal · Fruit",           lunch:"Fried Fish · French Fries · Salad Bar · Banana Pudding",               dinner:"Fried Fish · Green Beans · Fries w/ Parm · Chili · Salad Bar · Cookies" },
        { day:"Sat", bfast:"Eggs · Sausage Patty · Biscuit · Grits · Oatmeal · Fruit",            lunch:"Taco Salad · Ground Beef · Salad Bar · Cookies",                       dinner:"Grilled Hotdog · Chili · Mac & Cheese · Sour Kraut · Salad Bar · White Cake" },
        { day:"Sun", bfast:"Eggs · Sausage Patty · Biscuit · Grits · Oatmeal · Fruit",            lunch:"Fried Chicken · Green Beans · Salad Bar · Apple Cobbler",              dinner:"BBQ Chicken · Mac & Cheese · Baked Beans · Salad Bar · Choc Cake" }
      ]
    },
    {
      week: 3,
      days: [
        { day:"Mon", bfast:"Eggs · Bacon · Biscuit w/ Jelly · Grits · Oatmeal · Fruit",           lunch:"Chicken Tenders · French Fries · Salad Bar · Peach Cobbler",          dinner:"Baked Potato · Broccoli · Grilled Chicken · Salad Bar · Choc Cake" },
        { day:"Tue", bfast:"Eggs · Pork Sausage · French Toast w/ Syrup · Grits · Oatmeal · Fruit", lunch:"Chicken Philly · Fries · Bell Pepper/Onion/Cheese · Salad Bar",     dinner:"Taco Salad · Cheese Sauce · Sour Kraut · Chicken/Beef · Salad Bar · Apple Cobbler" },
        { day:"Wed", bfast:"Eggs · Bacon · Sausage Gravy · Boiled Eggs · Grits · Oatmeal",        lunch:"Fried Chicken Patty · French Fries · Salad Bar · Straw Cake",          dinner:"Spaghetti w/ Meat Sauce · Butter Corn · Garlic Bread · Salad Bar · White Cake" },
        { day:"Thu", bfast:"Eggs · Sausage Patty · Boiled Eggs · Grits · Oatmeal · Fruit",        lunch:"Grilled Hotdogs · Fries · Chili/Sour Kraut · Salad Bar · Choc Cake",   dinner:"Fried Chicken · Mashed Potatoes · Green Beans · Dinner Roll · Salad Bar · Yellow Cake" },
        { day:"Fri", bfast:"Eggs · Bacon · Waffles w/ Syrup · Grits · Oatmeal · Fruit",           lunch:"Fried Fish · French Fries · Salad Bar · Banana Pudding",               dinner:"Grilled Hamburger · Fries · Lettuce/Tomato/Cheese · Salad Bar · Cookies" },
        { day:"Sat", bfast:"Eggs · Sausage Patty · Biscuit · Grits · Oatmeal · Fruit",            lunch:"Taco Salad · Ground Beef · Salad Bar · Cookies",                       dinner:"Chicken Patty · Fries · Green Beans · Salad Bar · Straw Cake" },
        { day:"Sun", bfast:"Eggs · Sausage Patty · Biscuit · Grits · Oatmeal · Fruit",            lunch:"Spaghetti · Butter Corn · Dinner Roll · Salad Bar · Apple Cobbler",    dinner:"Baked Chicken · Mashed Potatoes · Green Beans · Salad Bar · Choc Cake" }
      ]
    },
    {
      week: 4,
      days: [
        { day:"Mon", bfast:"Eggs · Sausage · Bacon · Biscuit · Grits · Breakfast Potatoes",       lunch:"Baked Potato Bar · Broccoli · Cheese/Bacon Bits · Fries · Salad Bar",  dinner:"Chicken Philly · Bell Pepper/Onion · French Fries · Hoagie Bun · Choc Cake" },
        { day:"Tue", bfast:"Eggs · Waffles · Bacon · Grits · Breakfast Potatoes",                  lunch:"Pork Chop Sandwich · Fries · Lemon Pepper/BBQ · Salad Bar · Apple Cobbler", dinner:"Fried Chicken · Mashed Potatoes w/ Gravy · Carrots · Dinner Roll · White Cake" },
        { day:"Wed", bfast:"Eggs · Sausage Patty · Pancakes · Grits · Breakfast Potatoes",         lunch:"Fried Chicken · French Fries · Salad Bar · Peach Cobbler",             dinner:"Chicken Tezz · Broccoli · Grilled Chicken w/ Bell Pepper/Onion · Garlic Bread · Straw Cake" },
        { day:"Thu", bfast:"Eggs · Bacon · Cinnamon Rolls w/ Icing · Grits · Breakfast Potatoes", lunch:"Grilled Hotdog · Chili · Cheese Sauce · Sour Kraut · Salad Bar · Cookies", dinner:"Chicken Patty Sandwich · Fries · Green Beans · Cheese Sauce · Cinnamon Rolls" },
        { day:"Fri", bfast:"Eggs · Sausage Patty · Biscuit · Grits · Breakfast Potatoes",         lunch:"Fried Fish · French Fries · Salad Bar · Cookies",                      dinner:"Baked Fish · Mashed Potatoes · Green Beans · Cheese Sauce · Choc Cake" },
        { day:"Sat", bfast:"Eggs · Sausage Patty · Biscuit · Grits · Breakfast Potatoes",         lunch:"Grilled Burger · Fries w/ Parmesan · Salad Bar · Cookies",              dinner:"Taco Salad · Chicken/Beef · Green Beans · Sour Cream/Butter · Salad Bar · Cookies" },
        { day:"Sun", bfast:"Eggs · Sausage Patty · Biscuit · Grits · Breakfast Potatoes",         lunch:"Baked Chicken · Butter Corn · Mashed Potatoes · Salad Bar · Yellow Cake", dinner:"Fried Chicken · Rice w/ Gravy · Green Beans · Salad Bar · Peach Cobbler" }
      ]
    }
  ]
};

// ============================================================
//  CEO EXECUTIVE DASHBOARD DATA
// ============================================================
const CEO_DATA = {
  asOf:   "April 12, 2026",
  period: "14-week avg · Jan 5 – Apr 12, 2026",

  kpis: {
    weeklyRevAvg:    87500,
    annualRevenue:   4550000,
    weeklyNetAvg:    23131,
    annualNet:       1203000,
    avgNetPct:       0.260,
    totalSavingsOpp: 247000   // combined all identified opportunities
  },

  // Revenue line scorecard
  lines: [
    {
      name:        "Population",
      icon:        "fa-building",
      weeklyRev:   64000,
      pctOfTotal:  0.731,
      cogsPct:     0.385,
      target:      0.350,
      status:      "watch",
      statusLabel: "Watch",
      note:        "Actual $0.76/meal vs $0.54 target. 23 items identified for Shaver switch.",
      annualSavings: 48000,
      detail:      "Population is the business anchor — 73% of revenue. Food cost is controllable through vendor switching. Full Shaver transition is the highest-certainty lever available."
    },
    {
      name:        "Café",
      icon:        "fa-mug-hot",
      weeklyRev:   8272,
      pctOfTotal:  0.095,
      cogsPct:     0.467,
      target:      0.300,
      status:      "watch",
      statusLabel: "Watch",
      note:        "Birmingham 42.6% COGS · Bessemer 59.1% COGS — both above 30% target. Bessemer is the primary concern.",
      annualSavings: 83000,
      detail:      "Birmingham COGS is calculated against combined Café + Academy + JBS revenue ($9,654.60/week). At 42.6%, Birmingham is above the 30% target but not critical. Bessemer at 59.1% on flat $3,181.50/week revenue is the bigger concern. Primary cost reduction levers remain: produce contract for fresh fruit (~$35–47K/yr), replacing chicken tenders with Shaver chicken patty (~$13–16K/yr), and salad bar portioning discipline."
    },
    {
      name:        "Soft Trays",
      icon:        "fa-boxes-stacked",
      weeklyRev:   7200,
      pctOfTotal:  0.082,
      cogsPct:     0.423,
      target:      0.420,
      status:      "ok",
      statusLabel: "Healthy",
      note:        "Consistent 42.3% COGS across Birmingham and Bessemer. Low variance.",
      annualSavings: 0,
      detail:      "Soft Trays is a well-controlled line. COGS is stable and predictable at both locations. No immediate action needed — maintain current ordering discipline."
    },
    {
      name:        "Milk",
      icon:        "fa-bottle-droplet",
      weeklyRev:   2730,
      pctOfTotal:  0.031,
      cogsPct:     0.650,
      target:      0.500,
      status:      "watch",
      statusLabel: "Watch",
      note:        "65% apparent COGS · backend stipend exists · true net margin not yet quantified.",
      annualSavings: 0,
      detail:      "Milk shows exactly 65% COGS in the weekly P&L every week — a fixed contract rate. However, a backend stipend is in place that reduces the true net cost below what the report shows. The stipend does not appear in the WEEKLY tab; verify it is captured in Cash Flow. Until the stipend amount is documented and factored in, the true margin on this line cannot be stated. Pending quantification — do not flag for renegotiation without the full picture."
    },
    {
      name:        "Academy / JBS",
      icon:        "fa-graduation-cap",
      weeklyRev:   5300,
      pctOfTotal:  0.061,
      cogsPct:     0.340,
      target:      0.350,
      status:      "ok",
      statusLabel: "Healthy",
      note:        "Variable enrollment but good margin. JBS is consistent.",
      annualSavings: 0,
      detail:      "Academy enrollment varies week to week but COGS stays lean. JBS is a reliable, margin-positive line. Prioritize contract renewals and enrollment stability."
    }
  ],

  // 14-week net margin trend
  weeklyTrend: [
    { week: "Jan 5",  net: 20537,  pct: 0.231 },
    { week: "Jan 12", net: 21803,  pct: 0.244 },
    { week: "Jan 19", net: 10882,  pct: 0.125 },
    { week: "Jan 26", net: 26948,  pct: 0.310 },
    { week: "Feb 2",  net: 29103,  pct: 0.335 },
    { week: "Feb 9",  net: 27676,  pct: 0.325 },
    { week: "Feb 16", net: 30113,  pct: 0.348 },
    { week: "Feb 23", net: 25899,  pct: 0.295 },
    { week: "Mar 2",  net: 20935,  pct: 0.236 },
    { week: "Mar 9",  net: 22885,  pct: 0.262 },
    { week: "Mar 16", net: 21037,  pct: 0.244 },
    { week: "Mar 23", net: 21426,  pct: 0.238 },
    { week: "Mar 30", net: 18703,  pct: 0.213 },
    { week: "Apr 6",  net: 25889,  pct: 0.294 }
  ],

  // COGS discrepancies and anomalies found in the weekly financial data
  findings: [
    {
      id: 1,
      severity: "med",
      icon: "fa-snowflake",
      title: "Week of Jan 19 — Weather Prep Double-Order (Explained)",
      location: "Bessemer + Birmingham",
      detail: "Both locations show elevated COGS during Jan 19–25: net dropped to $10,882 and Bessemer ran a location-level loss of –$2,903. This is explained: management deliberately double-ordered food inventory in anticipation of potential bad-weather delivery disruptions. The inflated COGS reflects two weeks of product charged in one billing week — the cost was consumed over subsequent weeks. This is not a recurring operational failure. Financial data from this period should be weighted lightly in any trend analysis or cost benchmarking.",
      numbers: [
        { label: "Weekly Net", value: "$10,882", flag: "flag" },
        { label: "Root Cause", value: "Weather Prep", flag: "ok" },
        { label: "Bessemer Net", value: "–$2,903", flag: "flag" },
        { label: "Data Reliability", value: "Low — exclude", flag: "flag" }
      ]
    },
    {
      id: 2,
      severity: "high",
      icon: "fa-circle-question",
      title: "Unaccounted Credits in Population COGS",
      location: "Birmingham",
      detail: "Two weeks have an extra unlabeled value in the Population COGS row of the spreadsheet: Feb 16–22 shows $6,708.23 and Feb 23–Mar 1 shows $2,200.00. These appear to be credits or adjustments applied to the population food cost but are not labeled or explained anywhere in the report. Combined value: $8,908.23. Verify whether these are vendor rebates, contract credits, or data entry errors — and confirm whether they are properly reflected in the net figures.",
      numbers: [
        { label: "Feb 16 Credit", value: "$6,708", flag: "flag" },
        { label: "Feb 23 Credit", value: "$2,200", flag: "flag" },
        { label: "Combined", value: "$8,908", flag: "flag" },
        { label: "Label in Report", value: "None", flag: "bad" }
      ]
    },
    {
      id: 3,
      severity: "high",
      icon: "fa-chart-line",
      title: "Bessemer Café COGS — 54-Point Swing",
      location: "Bessemer",
      detail: "Bessemer café food cost has ranged from 35.3% to 89.9% across 14 weeks on perfectly flat weekly revenue of $3,181.50. This is a 54.6-point variance — impossible to explain by menu variation alone. Revenue is contract-fixed; cost should be predictable within a narrow band. Likely causes: bulk ordering in some weeks covering multiple weeks of usage, deliveries not aligned to the billing week, or no par-level ordering discipline. Standardize weekly order quantities immediately.",
      numbers: [
        { label: "Low COGS", value: "35.3%", flag: "ok" },
        { label: "High COGS", value: "89.9%", flag: "bad" },
        { label: "Variance Range", value: "54.6 pts", flag: "bad" },
        { label: "Weekly Revenue", value: "$3,182 (fixed)", flag: "ok" }
      ]
    },
    {
      id: 4,
      severity: "med",
      icon: "fa-arrow-trend-down",
      title: "Net Margin Declining Since February Peak",
      location: "Both Locations",
      detail: "Net margin peaked at 34.8% (Feb 16) and has trended down for most of the March–April period. The Mar 30 week hit $18,703 net — the second lowest on record. Five of the last six weeks have been below the 14-week average. Birmingham and Bessemer population COGS are both trending higher in Q1 close vs early February. If the trend continues, Q2 annualized net falls below $1M. Population vendor switch is the fastest available lever.",
      numbers: [
        { label: "Feb 16 Peak Net", value: "$30,113", flag: "ok" },
        { label: "Mar 30 Net", value: "$18,703", flag: "bad" },
        { label: "Weeks Below Avg", value: "5 of last 6", flag: "bad" },
        { label: "Apr 6 Net", value: "$25,889", flag: "flag" }
      ]
    }
  ],

  // Strategic action items — prioritized for CEO review
  actions: [
    {
      id: 1,
      category:  "Vendor Strategy",
      priority:  "critical",
      title:     "Execute PFG → Shaver Transition",
      detail:    "23 line items confirmed cheaper at Shaver. Population switch alone saves $1,146+/month with zero menu changes. Bid documentation and ISP pricing already in hand.",
      impact:    "$13,752+ / year",
      timeline:  "30 days",
      owner:     "Purchasing",
      status:    "ready",
      icon:      "fa-arrows-rotate"
    },
    {
      id: 2,
      category:  "Café Profitability",
      priority:  "critical",
      title:     "Produce Contract — Daily Fruit",
      detail:    "Fresh fruit (orange + banana) is served to 390 café diners every single breakfast. Estimated $78K/year at current retail sourcing. A standing produce contract cuts this by 50–60%.",
      impact:    "$35,000 – $47,000 / year",
      timeline:  "2 weeks",
      owner:     "Procurement",
      status:    "urgent",
      icon:      "fa-apple-whole"
    },
    {
      id: 3,
      category:  "Café Profitability",
      priority:  "high",
      title:     "Protein Swap + Salad Bar Restriction",
      detail:    "Replace Monday chicken tenders ($1.25/serving) with Shaver breaded patty ($0.36). Limit salad bar to lunch service only — currently running 3x/day. Combined saves $24K–$36K/year.",
      impact:    "$24,000 – $36,000 / year",
      timeline:  "Next menu cycle",
      owner:     "Operations",
      status:    "planning",
      icon:      "fa-drumstick-bite"
    },
    {
      id: 4,
      category:  "Café Profitability",
      priority:  "high",
      title:     "Review Café Meal Rate ($3.03 / meal)",
      detail:    "At $3.03/meal with 72.6% average food costs, the café generates $0.83 gross before labor. A rate renegotiation or structural menu change (or both) is required for this line to be sustainable.",
      impact:    "Structural — rate × 2,730 meals/week",
      timeline:  "60 days",
      owner:     "CEO",
      status:    "review",
      icon:      "fa-dollar-sign"
    },
    {
      id: 5,
      category:  "Operations",
      priority:  "high",
      title:     "Standardize Bessemer Café Ordering",
      detail:    "Bessemer COGS swings from 35% to 90% week to week — a 55-point range that signals inconsistent ordering, portioning, or timing. Standardize par levels and weekly order quantities.",
      impact:    "$8,000 – $15,000 / year",
      timeline:  "45 days",
      owner:     "Operations",
      status:    "planning",
      icon:      "fa-sliders"
    },
    {
      id: 6,
      category:  "Finance",
      priority:  "med",
      title:     "Document Milk Backend Stipend",
      detail:    "Milk shows 65% COGS in every weekly P&L report, but a backend stipend is in place that is not reflected in the WEEKLY tab. Until the stipend is quantified and applied, the true net margin on milk is unknown. Action: pull the stipend amount from Cash Flow, document it as a formal line credit, and recalculate the true COGS for milk. Do not flag for renegotiation without the full picture.",
      impact:    "True margin TBD — likely better than reported",
      timeline:  "2 weeks",
      owner:     "Finance",
      status:    "review",
      icon:      "fa-magnifying-glass-dollar"
    }
  ]
};
