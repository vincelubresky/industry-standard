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
    { label: "Items: Switch to Shaver", value: "22", icon: "fa-arrows-rotate", color: "danger", note: "Shaver is cheaper" },
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
    { item: "Gravy Mix (Country)",            pfgPrice: 29.92,  pfgUnit: "6/16 OZ",    shaverPrice: 37.82, shaverUnit: "6/3 LB",      savings: null,  priority: "med", note: "$2.89/lb cheaper at Shaver" }
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
const MENU_ROTATION = [
  {
    week: 1, label: "Week 1",
    days: [
      { day: "Monday",
        breakfast: { main: "Grits + Sausage",         sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.25", cal: 650 },
        lunch:     { main: "Pinto Beans & Rice",       sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.32", cal: 1080 },
        dinner:    { main: "Turkey Sandwich",          sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.55", cal: 850 } },
      { day: "Tuesday",
        breakfast: { main: "Oatmeal",                  sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.20", cal: 580 },
        lunch:     { main: "Mac & Cheese",             sides: ["Cornbread (2)", "Green Beans", "Cake"],       cost: "$0.38", cal: 1020 },
        dinner:    { main: "Salami Sandwich",          sides: ["Cornbread", "Peas & Carrots", "Cake"],        cost: "$0.48", cal: 830 } },
      { day: "Wednesday",
        breakfast: { main: "Eggs Scrambled + Sausage", sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.38", cal: 710 },
        lunch:     { main: "Pasta w/ Tomato Sauce",    sides: ["Cornbread (2)", "Mixed Veg", "Cake"],         cost: "$0.30", cal: 980 },
        dinner:    { main: "PB&J Sandwich",            sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.32", cal: 800 } },
      { day: "Thursday",
        breakfast: { main: "Grits",                    sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.18", cal: 530 },
        lunch:     { main: "Northern Beans & Rice",    sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.32", cal: 1080 },
        dinner:    { main: "Chicken Patty Sandwich",   sides: ["Cornbread", "Mixed Veg", "Cake"],             cost: "$0.60", cal: 870 } },
      { day: "Friday",
        breakfast: { main: "Grits + Sausage",          sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.25", cal: 650 },
        lunch:     { main: "Mac & Cheese",             sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.38", cal: 1020 },
        dinner:    { main: "Turkey Sandwich",          sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.55", cal: 850 } },
      { day: "Saturday",
        breakfast: { main: "Oatmeal",                  sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.20", cal: 580 },
        lunch:     { main: "Pasta & Vegetables",       sides: ["Cornbread (2)", "Green Beans", "Cake"],       cost: "$0.30", cal: 960 },
        dinner:    { main: "PB&J Sandwich",            sides: ["Cornbread", "Peas & Carrots", "Cake"],        cost: "$0.32", cal: 810 } },
      { day: "Sunday",
        breakfast: { main: "Eggs Scrambled + Sausage", sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.38", cal: 710 },
        lunch:     { main: "Pinto Beans & Rice",       sides: ["Cornbread (2)", "Mixed Veg", "Cake"],         cost: "$0.32", cal: 1060 },
        dinner:    { main: "Salami Sandwich",          sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.48", cal: 830 } }
    ]
  },
  {
    week: 2, label: "Week 2",
    days: [
      { day: "Monday",
        breakfast: { main: "Grits + Sausage",          sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.25", cal: 650 },
        lunch:     { main: "Northern Beans & Rice",    sides: ["Cornbread (2)", "Green Beans", "Cake"],       cost: "$0.32", cal: 1060 },
        dinner:    { main: "Chicken Patty Sandwich",   sides: ["Cornbread", "Peas & Carrots", "Cake"],        cost: "$0.60", cal: 870 } },
      { day: "Tuesday",
        breakfast: { main: "Oatmeal",                  sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.20", cal: 580 },
        lunch:     { main: "Pasta w/ Tomato Sauce",    sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.30", cal: 1000 },
        dinner:    { main: "Turkey Sandwich",          sides: ["Cornbread", "Mixed Veg", "Cake"],             cost: "$0.55", cal: 840 } },
      { day: "Wednesday",
        breakfast: { main: "Eggs Scrambled + Sausage", sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.38", cal: 710 },
        lunch:     { main: "Pinto Beans & Rice",       sides: ["Cornbread (2)", "Mixed Veg", "Cake"],         cost: "$0.32", cal: 1060 },
        dinner:    { main: "PB&J Sandwich",            sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.32", cal: 800 } },
      { day: "Thursday",
        breakfast: { main: "Grits",                    sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.18", cal: 530 },
        lunch:     { main: "Mashed Potatoes & Gravy",  sides: ["Cornbread (2)", "Green Beans", "Cake"],       cost: "$0.35", cal: 1040 },
        dinner:    { main: "Salami Sandwich",          sides: ["Cornbread", "Peas & Carrots", "Cake"],        cost: "$0.48", cal: 840 } },
      { day: "Friday",
        breakfast: { main: "Grits + Sausage",          sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.25", cal: 650 },
        lunch:     { main: "Mac & Cheese",             sides: ["Cornbread (2)", "Mixed Veg", "Cake"],         cost: "$0.38", cal: 1020 },
        dinner:    { main: "Turkey Sandwich",          sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.55", cal: 850 } },
      { day: "Saturday",
        breakfast: { main: "Oatmeal",                  sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.20", cal: 580 },
        lunch:     { main: "Northern Beans & Rice",    sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.32", cal: 1080 },
        dinner:    { main: "PB&J Sandwich",            sides: ["Cornbread", "Mixed Veg", "Cake"],             cost: "$0.32", cal: 800 } },
      { day: "Sunday",
        breakfast: { main: "Eggs Scrambled + Sausage", sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.38", cal: 710 },
        lunch:     { main: "Pasta & Vegetables",       sides: ["Cornbread (2)", "Green Beans", "Cake"],       cost: "$0.30", cal: 960 },
        dinner:    { main: "Chicken Patty Sandwich",   sides: ["Cornbread", "Peas & Carrots", "Cake"],        cost: "$0.60", cal: 870 } }
    ]
  },
  {
    week: 3, label: "Week 3",
    days: [
      { day: "Monday",
        breakfast: { main: "Grits + Sausage",          sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.25", cal: 650 },
        lunch:     { main: "Pinto Beans & Rice",       sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.32", cal: 1080 },
        dinner:    { main: "Salami Sandwich",          sides: ["Cornbread", "Mixed Veg", "Cake"],             cost: "$0.48", cal: 840 } },
      { day: "Tuesday",
        breakfast: { main: "Oatmeal",                  sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.20", cal: 580 },
        lunch:     { main: "Mac & Cheese",             sides: ["Cornbread (2)", "Green Beans", "Cake"],       cost: "$0.38", cal: 1020 },
        dinner:    { main: "Turkey Sandwich",          sides: ["Cornbread", "Peas & Carrots", "Cake"],        cost: "$0.55", cal: 850 } },
      { day: "Wednesday",
        breakfast: { main: "Eggs Scrambled + Sausage", sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.38", cal: 710 },
        lunch:     { main: "Northern Beans & Rice",    sides: ["Cornbread (2)", "Mixed Veg", "Cake"],         cost: "$0.32", cal: 1060 },
        dinner:    { main: "PB&J Sandwich",            sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.32", cal: 800 } },
      { day: "Thursday",
        breakfast: { main: "Grits",                    sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.18", cal: 530 },
        lunch:     { main: "Pasta w/ Tomato Sauce",    sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.30", cal: 990 },
        dinner:    { main: "Chicken Patty Sandwich",   sides: ["Cornbread", "Mixed Veg", "Cake"],             cost: "$0.60", cal: 870 } },
      { day: "Friday",
        breakfast: { main: "Grits + Sausage",          sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.25", cal: 650 },
        lunch:     { main: "Pasta & Vegetables",       sides: ["Cornbread (2)", "Green Beans", "Cake"],       cost: "$0.30", cal: 960 },
        dinner:    { main: "Turkey Sandwich",          sides: ["Cornbread", "Peas & Carrots", "Cake"],        cost: "$0.55", cal: 840 } },
      { day: "Saturday",
        breakfast: { main: "Oatmeal",                  sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.20", cal: 580 },
        lunch:     { main: "Mashed Potatoes & Gravy",  sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.35", cal: 1050 },
        dinner:    { main: "Salami Sandwich",          sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.48", cal: 830 } },
      { day: "Sunday",
        breakfast: { main: "Eggs Scrambled + Sausage", sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.38", cal: 710 },
        lunch:     { main: "Pinto Beans & Rice",       sides: ["Cornbread (2)", "Mixed Veg", "Cake"],         cost: "$0.32", cal: 1060 },
        dinner:    { main: "PB&J Sandwich",            sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.32", cal: 800 } }
    ]
  },
  {
    week: 4, label: "Week 4",
    days: [
      { day: "Monday",
        breakfast: { main: "Grits + Sausage",          sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.25", cal: 650 },
        lunch:     { main: "Northern Beans & Rice",    sides: ["Cornbread (2)", "Green Beans", "Cake"],       cost: "$0.32", cal: 1060 },
        dinner:    { main: "Turkey Sandwich",          sides: ["Cornbread", "Peas & Carrots", "Cake"],        cost: "$0.55", cal: 840 } },
      { day: "Tuesday",
        breakfast: { main: "Oatmeal",                  sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.20", cal: 580 },
        lunch:     { main: "Pasta & Vegetables",       sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.30", cal: 970 },
        dinner:    { main: "PB&J Sandwich",            sides: ["Cornbread", "Mixed Veg", "Cake"],             cost: "$0.32", cal: 800 } },
      { day: "Wednesday",
        breakfast: { main: "Eggs Scrambled + Sausage", sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.38", cal: 710 },
        lunch:     { main: "Pinto Beans & Rice",       sides: ["Cornbread (2)", "Mixed Veg", "Cake"],         cost: "$0.32", cal: 1060 },
        dinner:    { main: "Salami Sandwich",          sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.48", cal: 830 } },
      { day: "Thursday",
        breakfast: { main: "Grits",                    sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.18", cal: 530 },
        lunch:     { main: "Mac & Cheese",             sides: ["Cornbread (2)", "Green Beans", "Cake"],       cost: "$0.38", cal: 1020 },
        dinner:    { main: "Chicken Patty Sandwich",   sides: ["Cornbread", "Peas & Carrots", "Cake"],        cost: "$0.60", cal: 870 } },
      { day: "Friday",
        breakfast: { main: "Grits + Sausage",          sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.25", cal: 650 },
        lunch:     { main: "Pasta w/ Tomato Sauce",    sides: ["Cornbread (2)", "Mixed Veg", "Cake"],         cost: "$0.30", cal: 990 },
        dinner:    { main: "Turkey Sandwich",          sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.55", cal: 840 } },
      { day: "Saturday",
        breakfast: { main: "Oatmeal",                  sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.20", cal: 580 },
        lunch:     { main: "Northern Beans & Rice",    sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.32", cal: 1080 },
        dinner:    { main: "PB&J Sandwich",            sides: ["Cornbread", "Mixed Veg", "Cake"],             cost: "$0.32", cal: 800 } },
      { day: "Sunday",
        breakfast: { main: "Eggs Scrambled + Sausage", sides: ["Bread (2 sl)", "Jelly", "Drink Mix"],         cost: "$0.38", cal: 710 },
        lunch:     { main: "Mashed Potatoes & Gravy",  sides: ["Cornbread (2)", "Peas & Carrots", "Cake"],    cost: "$0.35", cal: 1050 },
        dinner:    { main: "Salami Sandwich",          sides: ["Cornbread", "Green Beans", "Cake"],           cost: "$0.48", cal: 830 } }
    ]
  }
];

/* ============================================================
   MEAL IDEAS LIBRARY
   Separate from the rotation — ideas to pull from or add next cycle.
   ============================================================ */
const MEAL_IDEAS = {
  breakfast: [
    { name: "Biscuits & Gravy",       cost: "$0.34", note: "Biscuit mix + country gravy — comfort staple, zero waste, easy batch" },
    { name: "Cinnamon Oatmeal",       cost: "$0.22", note: "Existing oatmeal + cinnamon + sugar packets — simple upgrade" },
    { name: "Grits Bar",              cost: "$0.28", note: "Grits base + rotating toppings (butter, sausage, cheese sauce) — adds variety to existing grits days" },
    { name: "Egg & Sausage Sandwich", cost: "$0.48", note: "Scrambled egg + sausage patty on bread — hot sandwich format, no new equipment" },
    { name: "Oatmeal Cookie",         cost: "$0.12", note: "Shaver Oatmeal Cookie Mix 50# ($41.58) — bake as breakfast dessert or snack" }
  ],
  lunch: [
    { name: "White Bean Chili",       cost: "$0.24", note: "Great Northern Beans + tomatoes + chicken base + spices — hearty, filling, very cheap" },
    { name: "Beef Vegetable Soup",    cost: "$0.35", note: "TVP beef chunks + mixed veg + chicken base + tomato — volume extender, high perceived value" },
    { name: "Split Pea Soup",         cost: "$0.18", note: "Split peas (add to Shaver order) + carrots + chicken base — cheapest soup option" },
    { name: "Potato Soup",            cost: "$0.22", note: "Dehy potato flakes + chicken base + margarine — thick, filling, uses existing inventory" },
    { name: "Rice & Brown Gravy",     cost: "$0.19", note: "Parboiled rice + country gravy mix — ultra-low cost, serves as a side or main" },
    { name: "Tater Tot Casserole",    cost: "$0.58", note: "Shaver Tater Tots 6/5# ($28.85) + cheese sauce + TVP — crowd favorite, simple assembly" },
    { name: "Sloppy Joe (TVP)",       cost: "$0.38", note: "TVP beef + tomato sauce + seasoning on bread — familiar protein that stretches budget" },
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
