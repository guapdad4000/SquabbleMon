/**
 * Squabble Shop System
 * Handles different shop types, inventories, buying/selling
 */

// Shop types with unique properties
const SHOP_TYPES = {
  CORNER_STORE: 'cornerStore',
  THE_TRAP: 'theTrap',
  CLOUT_DEALER: 'cloutDealer',
  POP_UP_VAN: 'popUpVan',
  
  // New shops for expanded map
  TRAP_HOUSE: 'trapHouse',
  MOMMA_KITCHEN: 'mommaKitchen'
};

// Create a basic shop inventory based on type
function createShopInventory(shopType) {
  const shop = {
    type: shopType,
    name: getShopName(shopType),
    items: [],
    restockTimer: 0, // Days/battles until restock
    markup: 1.0 // Price multiplier
  };
  
  // Fill with items based on shop type
  switch (shopType) {
    case SHOP_TYPES.CORNER_STORE:
      shop.items = getCornerStoreItems();
      shop.markup = 1.0; // Standard pricing
      shop.restockTimer = 5; // Restocks frequently
      break;
      
    case SHOP_TYPES.THE_TRAP:
      shop.items = getTrapItems();
      shop.markup = 1.5; // Higher prices for rare items
      shop.restockTimer = 10; // Restocks less frequently
      break;
      
    case SHOP_TYPES.CLOUT_DEALER:
      shop.items = getCloutDealerItems();
      shop.markup = 2.0; // Premium prices for cosmetics
      shop.restockTimer = 15; // Rare restocks
      break;
      
    case SHOP_TYPES.POP_UP_VAN:
      shop.items = getPopUpVanItems();
      shop.markup = 0.8; // Discounted items but random quality
      shop.restockTimer = -1; // One-time shop, moves locations
      break;
      
    // New shop types for expanded areas
    case SHOP_TYPES.TRAP_HOUSE:
      shop.items = getTrapHouseItems();
      shop.markup = 1.8; // Higher prices for powerful items
      shop.restockTimer = 12; // Restocks less frequently
      break;
      
    case SHOP_TYPES.MOMMA_KITCHEN:
      shop.items = getMommaKitchenItems();
      shop.markup = 0.7; // Discount because it's family
      shop.restockTimer = 3; // Restocks very frequently
      break;
  }
  
  return shop;
}

// Get shop name based on type
function getShopName(shopType) {
  switch (shopType) {
    case SHOP_TYPES.CORNER_STORE:
      return "Corner Store";
    case SHOP_TYPES.THE_TRAP:
      return "The Trap";
    case SHOP_TYPES.CLOUT_DEALER:
      return "Clout Dealer";
    case SHOP_TYPES.POP_UP_VAN:
      return "Pop-Up Van";
    case SHOP_TYPES.TRAP_HOUSE:
      return "Trap House Essentials";
    case SHOP_TYPES.MOMMA_KITCHEN:
      return "Big Momma's Kitchen";
    default:
      return "Unknown Shop";
  }
}

// Corner Store inventory (basic items, consistent availability)
function getCornerStoreItems() {
  return [
    {
      id: 'energy_drink',
      name: 'Energy Drink',
      type: 'consumable',
      effect: 'healing',
      hpBoost: 30,
      price: 15,
      description: 'Restores 30 HP to a character',
      icon: '🥤',
      stock: 10
    },
    {
      id: 'weed',
      name: 'Weed',
      type: 'consumable',
      effect: 'statusCure',
      hpBoost: 10,
      price: 30,
      description: 'Cures status effects and restores a small amount of HP',
      icon: '🌿',
      stock: 5
    },
    {
      id: 'protein_shake',
      name: 'Protein Shake',
      type: 'consumable',
      effect: 'statBoost',
      boostStat: 'attack',
      boostValue: 1.2,
      duration: 3,
      price: 40,
      description: 'Boosts Attack by 20% for 3 turns',
      icon: '🥛',
      stock: 3
    },
    {
      id: 'hot_sauce',
      name: 'Hot Sauce',
      type: 'consumable',
      effect: 'healing',
      hpBoost: 50,
      price: 25,
      description: 'Restores 50 HP to a character',
      icon: '🌶️',
      stock: 8
    }
  ];
}

// The Trap inventory (rare moves, risky items, laced buffs)
function getTrapItems() {
  return [
    {
      id: 'trap_fire_chip',
      name: 'Trap Fire Chip',
      type: 'moveChip',
      power: 60,
      moveType: 'fire',
      compatibleTypes: ['Fire', 'Dark'],
      price: 200,
      description: 'Teaches a compatible character the Trap Fire move',
      icon: '🔥',
      stock: 1
    },
    {
      id: 'bootleg_energy',
      name: 'Bootleg Energy Drink',
      type: 'consumable',
      effect: 'statBoost',
      boostStat: 'attack',
      boostValue: 1.5,
      duration: 4,
      drawback: { stat: 'defense', value: 0.8 },
      price: 100,
      description: 'Boosts Attack by 50% but reduces Defense by 20% for 4 turns',
      icon: '⚡',
      stock: 2
    },
    {
      id: 'gold_chain',
      name: 'Gold Chain',
      type: 'gear',
      slot: 'accessory',
      effect: { stat: 'critRate', value: 10 },
      price: 350,
      description: 'Increases Critical Hit Rate by 10%',
      icon: '⛓️',
      stock: 1,
      showOnCharacter: true
    },
    {
      id: 'laced_blunt',
      name: 'Laced Blunt',
      type: 'consumable',
      effect: 'statBoost',
      boostStat: 'defense',
      boostValue: 1.5,
      duration: 5,
      drawback: { stat: 'speed', value: 0.7 },
      price: 120,
      description: 'Boosts Defense by 50% but reduces Speed by 30% for 5 turns',
      icon: '🚬',
      stock: 2
    }
  ];
}

// Clout Dealer inventory (visual/cosmetic items)
function getCloutDealerItems() {
  return [
    {
      id: 'dirt_bike',
      name: 'Dirt Bike',
      type: 'gear',
      slot: 'vehicle',
      effect: { stat: 'speed', value: 10 },
      price: 500,
      description: 'Increases Speed by 10 and looks fire',
      icon: '🏍️',
      stock: 1,
      showOnCharacter: true
    },
    {
      id: 'groupies',
      name: 'Groupies',
      type: 'gear',
      slot: 'entourage',
      effect: { stat: 'critRate', value: 5 },
      price: 450,
      description: 'Increases Critical Hit Rate by 5% and shows your status',
      icon: '👯',
      stock: 1,
      showOnCharacter: true
    },
    {
      id: 'slick_shades',
      name: 'Slick Shades',
      type: 'gear',
      slot: 'accessory',
      effect: { stat: 'dodgeChance', value: 5 },
      price: 300,
      description: 'Increases Dodge Chance by 5% and looks cool',
      icon: '😎',
      stock: 2,
      showOnCharacter: true
    },
    {
      id: 'backpack',
      name: 'Designer Backpack',
      type: 'gear',
      slot: 'accessory',
      effect: { stat: 'defense', value: 5 },
      extraItemSlots: 2,
      price: 400,
      description: 'Increases Defense by 5 and adds 2 item slots',
      icon: '🎒',
      stock: 1,
      showOnCharacter: true
    }
  ];
}

// Pop-Up Van inventory (random limited-time offerings)
function getPopUpVanItems() {
  // Random selection of 2-4 items from other shops at discount
  const allItems = [
    ...getCornerStoreItems(),
    ...getTrapItems(),
    ...getCloutDealerItems()
  ];
  
  // Shuffle array
  for (let i = allItems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allItems[i], allItems[j]] = [allItems[j], allItems[i]];
  }
  
  // Take 2-4 random items
  const count = 2 + Math.floor(Math.random() * 3);
  const items = allItems.slice(0, count);
  
  // Apply random discounts (or rarely markups)
  items.forEach(item => {
    const priceModifier = 0.6 + Math.random() * 0.8; // 60% to 140% of original price
    item.price = Math.round(item.price * priceModifier);
    item.stock = 1 + Math.floor(Math.random() * 2); // 1-2 of each item
  });
  
  return items;
}

// Trap House inventory (powerful but expensive combat items with drawbacks)
function getTrapHouseItems() {
  return [
    {
      id: 'glock',
      name: 'Glock',
      type: 'gear',
      slot: 'weapon',
      effect: { stat: 'attack', value: 20 },
      drawback: { stat: 'speed', value: -5 },
      price: 500,
      description: 'Increases Attack by 20 but decreases Speed by 5',
      icon: '🔫',
      stock: 1,
      showOnCharacter: true
    },
    {
      id: 'bulletproof_vest',
      name: 'Bulletproof Vest',
      type: 'gear',
      slot: 'armor',
      effect: { stat: 'defense', value: 30 },
      drawback: { stat: 'speed', value: -10 },
      price: 650,
      description: 'Increases Defense by 30 but decreases Speed by 10',
      icon: '🦺',
      stock: 1,
      showOnCharacter: true
    },
    {
      id: 'codeine_syrup',
      name: 'Codeine Syrup',
      type: 'consumable',
      effect: 'statBoost',
      boostStat: 'defense',
      boostValue: 2.0,
      duration: 5,
      drawback: { stat: 'speed', value: 0.5 },
      price: 200,
      description: 'Doubles Defense but halves Speed for 5 turns',
      icon: '🍇',
      stock: 3
    },
    {
      id: 'trap_pack',
      name: 'Trap Pack',
      type: 'consumable',
      effect: 'fullRestore',
      price: 300,
      description: 'Fully restores HP and clears all status conditions',
      icon: '💊',
      stock: 2
    },
    {
      id: 'money_counter',
      name: 'Money Counter',
      type: 'gear',
      slot: 'accessory',
      effect: { stat: 'moneyBoost', value: 20 },
      price: 450,
      description: 'Increases money earned from battles by 20%',
      icon: '💵',
      stock: 1,
      showOnCharacter: true
    },
    {
      id: 'burner_phone',
      name: 'Burner Phone',
      type: 'consumable',
      effect: 'escape',
      price: 100,
      description: 'Guarantees escape from any battle',
      icon: '📱',
      stock: 3
    }
  ];
}

// Momma's Kitchen inventory (healing and support items)
function getMommaKitchenItems() {
  return [
    {
      id: 'soul_food',
      name: 'Soul Food',
      type: 'consumable',
      effect: 'healing',
      hpBoost: 100,
      price: 50,
      description: "Restores 100 HP with Momma's special recipe",
      icon: '🍗',
      stock: 10
    },
    {
      id: 'sweet_potato_pie',
      name: 'Sweet Potato Pie',
      type: 'consumable',
      effect: 'statBoost',
      boostStat: 'attack',
      boostValue: 1.3,
      duration: 5,
      price: 70,
      description: 'Increases Attack by 30% for 5 turns',
      icon: '🥧',
      stock: 5
    },
    {
      id: 'collard_greens',
      name: 'Collard Greens',
      type: 'consumable',
      effect: 'statBoost',
      boostStat: 'defense',
      boostValue: 1.3,
      duration: 5,
      price: 70,
      description: 'Increases Defense by 30% for 5 turns',
      icon: '🥬',
      stock: 5
    },
    {
      id: 'secret_sauce',
      name: 'Secret Sauce',
      type: 'consumable',
      effect: 'statBoost',
      boostStat: 'speed',
      boostValue: 1.3,
      duration: 5,
      price: 70,
      description: 'Increases Speed by 30% for 5 turns',
      icon: '🍯',
      stock: 5
    },
    {
      id: 'family_recipe',
      name: 'Family Recipe',
      type: 'consumable',
      effect: 'teamBoost',
      boostStat: 'all',
      boostValue: 1.1,
      duration: 3,
      price: 150,
      description: 'Increases all stats by 10% for the whole team for 3 turns',
      icon: '📝',
      stock: 2
    },
    {
      id: 'mamas_blessing',
      name: "Mama's Blessing",
      type: 'consumable',
      effect: 'revive',
      hpPercent: 50,
      price: 200,
      description: 'Revives a fainted character with 50% HP',
      icon: '🙏',
      stock: 1
    },
    {
      id: 'home_cooking',
      name: 'Home Cooking',
      type: 'consumable',
      effect: 'fullRestore',
      statusCure: true,
      price: 150,
      description: 'Fully restores HP and clears all status conditions',
      icon: '🍲',
      stock: 3
    }
  ];
}

// Buy an item from a shop
function buyItem(shop, itemId, playerInventory, quantity = 1) {
  if (!shop || !itemId || !playerInventory) return { success: false, message: "Invalid parameters" };
  
  // Find the item in the shop
  const itemIndex = shop.items.findIndex(item => item.id === itemId);
  if (itemIndex === -1) return { success: false, message: "Item not found in shop" };
  
  const item = shop.items[itemIndex];
  
  // Check if enough stock is available
  if (item.stock < quantity) {
    return { 
      success: false, 
      message: `Not enough stock. Only ${item.stock} available.`
    };
  }
  
  // Calculate total cost
  const totalCost = item.price * quantity;
  
  // Check if player has enough money
  if (playerInventory.money < totalCost) {
    return { 
      success: false, 
      message: `Not enough money. Need ${totalCost}, you have ${playerInventory.money}.`
    };
  }
  
  // Process the purchase
  playerInventory.money -= totalCost;
  
  // Reduce shop stock
  shop.items[itemIndex].stock -= quantity;
  
  // Remove from shop if out of stock
  if (shop.items[itemIndex].stock <= 0) {
    shop.items.splice(itemIndex, 1);
  }
  
  // Add item to player inventory based on type
  const itemToAdd = {...item, count: quantity};
  delete itemToAdd.stock; // Remove stock property
  delete itemToAdd.price; // Remove price property
  
  if (item.type === 'moveChip') {
    if (!playerInventory.moveChips) playerInventory.moveChips = [];
    playerInventory.moveChips.push(itemToAdd);
  } else if (item.type === 'gear') {
    if (!playerInventory.gear) playerInventory.gear = [];
    playerInventory.gear.push(itemToAdd);
  } else {
    // For consumables and other standard items
    window.InventorySystem.addItemToInventory(playerInventory, itemToAdd);
  }
  
  return {
    success: true,
    message: `Purchased ${quantity} ${item.name} for ${totalCost} money.`,
    item: item,
    totalCost
  };
}

// Sell an item to a shop
function sellItem(shop, itemId, playerInventory, quantity = 1) {
  if (!shop || !itemId || !playerInventory) return { success: false, message: "Invalid parameters" };
  
  // Find the item in player's inventory
  let itemToSell;
  let itemCategory;
  
  // Check regular items
  const itemIndex = playerInventory.items.findIndex(item => item.id === itemId);
  if (itemIndex !== -1) {
    itemToSell = playerInventory.items[itemIndex];
    itemCategory = 'items';
  }
  
  // Check move chips
  if (!itemToSell && playerInventory.moveChips) {
    const chipIndex = playerInventory.moveChips.findIndex(chip => chip.id === itemId);
    if (chipIndex !== -1) {
      itemToSell = playerInventory.moveChips[chipIndex];
      itemCategory = 'moveChips';
    }
  }
  
  // Check gear
  if (!itemToSell && playerInventory.gear) {
    const gearIndex = playerInventory.gear.findIndex(gear => gear.id === itemId);
    if (gearIndex !== -1) {
      itemToSell = playerInventory.gear[gearIndex];
      itemCategory = 'gear';
    }
  }
  
  if (!itemToSell) {
    return { success: false, message: "Item not found in inventory" };
  }
  
  // Check if player has enough quantity to sell
  if (itemToSell.count < quantity) {
    return { 
      success: false, 
      message: `Not enough items to sell. You have ${itemToSell.count}, trying to sell ${quantity}.`
    };
  }
  
  // Calculate sell price (50% of buy price)
  const sellPrice = Math.floor((itemToSell.price || 50) * 0.5 * quantity);
  
  // Process the sale
  playerInventory.money += sellPrice;
  
  // Remove from player inventory
  if (itemCategory === 'items') {
    window.InventorySystem.removeItemFromInventory(playerInventory, itemId, quantity);
  } else {
    // For move chips and gear (typically can't have multiples, so remove entirely)
    const index = playerInventory[itemCategory].findIndex(i => i.id === itemId);
    if (index !== -1) {
      playerInventory[itemCategory].splice(index, 1);
    }
  }
  
  return {
    success: true,
    message: `Sold ${quantity} ${itemToSell.name} for ${sellPrice} money.`,
    item: itemToSell,
    totalPrice: sellPrice
  };
}

// Restock a shop's inventory
function restockShop(shop) {
  if (!shop) return false;
  
  // Reset restock timer
  shop.restockTimer = getRestockTime(shop.type);
  
  // Create new inventory based on shop type
  const newShop = createShopInventory(shop.type);
  
  // Update shop with new items
  shop.items = newShop.items;
  
  return true;
}

// Get restock time based on shop type
function getRestockTime(shopType) {
  switch (shopType) {
    case SHOP_TYPES.CORNER_STORE:
      return 5; // 5 battles/days
    case SHOP_TYPES.THE_TRAP:
      return 10; // 10 battles/days
    case SHOP_TYPES.CLOUT_DEALER:
      return 15; // 15 battles/days
    case SHOP_TYPES.POP_UP_VAN:
      return -1; // Never restocks, one-time only
    case SHOP_TYPES.TRAP_HOUSE:
      return 12; // 12 battles/days
    case SHOP_TYPES.MOMMA_KITCHEN:
      return 3; // 3 battles/days - Momma's always cooking!
    default:
      return 10;
  }
}

// Export the shop system
window.ShopSystem = {
  SHOP_TYPES,
  createShopInventory,
  buyItem,
  sellItem,
  restockShop
};