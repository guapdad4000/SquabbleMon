/**
 * Squabble Inventory & Gear System
 * Handles items, gear, and their effects on characters
 */

// Create a player's inventory with default starting items
function createPlayerInventory() {
  return {
    money: 100, // Starting cash
    items: [
      // Start with some basic healing items
      { id: 'weed', name: 'Weed', type: 'consumable', effect: 'statusCure', hpBoost: 10, count: 2, icon: '🌿', description: 'Cures status effects and restores a small amount of HP' },
      { id: 'energy_drink', name: 'Energy Drink', type: 'consumable', effect: 'healing', hpBoost: 30, count: 3, icon: '🥤', description: 'Restores 30 HP to a character' }
    ],
    moveChips: [], // No move chips to start
    gear: [] // No gear to start
  };
}

// Add item to inventory (or increase count if already exists)
function addItemToInventory(inventory, item) {
  if (!inventory || !item) return false;
  
  // Check if item already exists in inventory
  const existingItem = inventory.items.find(i => i.id === item.id);
  
  if (existingItem) {
    // Increase count if item already exists
    existingItem.count += item.count || 1;
  } else {
    // Add new item with count property
    const itemWithCount = {...item};
    if (!itemWithCount.count) itemWithCount.count = 1;
    inventory.items.push(itemWithCount);
  }
  
  return true;
}

// Remove item from inventory (decrease count or remove entirely)
function removeItemFromInventory(inventory, itemId, count = 1) {
  if (!inventory) return false;
  
  const itemIndex = inventory.items.findIndex(item => item.id === itemId);
  if (itemIndex === -1) return false;
  
  // Decrease count
  inventory.items[itemIndex].count -= count;
  
  // Remove item entirely if count reaches 0
  if (inventory.items[itemIndex].count <= 0) {
    inventory.items.splice(itemIndex, 1);
  }
  
  return true;
}

// Add gear to inventory
function addGearToInventory(inventory, gear) {
  if (!inventory || !gear) return false;
  
  // Ensure gear has an ID
  if (!gear.id) gear.id = gear.name.toLowerCase().replace(/\\s+/g, '_');
  
  // Add gear to inventory
  inventory.gear.push(gear);
  
  return true;
}

// Equip gear to a character
function equipGear(character, gear) {
  if (!character || !gear) return false;
  
  // Make sure character has gear slots
  if (!character.gearSlots) character.gearSlots = [];
  
  // Find an appropriate gear slot
  const slot = character.gearSlots.find(s => s.type === gear.slot);
  if (!slot) return false;
  
  // Remove any existing gear from this slot
  const oldGear = slot.equipped;
  
  // Equip the new gear
  slot.equipped = gear;
  
  // Apply stat changes from gear
  applyGearStats(character, gear, true);
  
  // Remove old gear stats if applicable
  if (oldGear) {
    applyGearStats(character, oldGear, false);
    return oldGear; // Return the removed gear
  }
  
  return true;
}

// Unequip gear from a character
function unequipGear(character, slotType) {
  if (!character || !character.gearSlots) return null;
  
  // Find the specified gear slot
  const slot = character.gearSlots.find(s => s.type === slotType);
  if (!slot || !slot.equipped) return null;
  
  // Get the gear being unequipped
  const gear = slot.equipped;
  
  // Remove the gear's stat effects
  applyGearStats(character, gear, false);
  
  // Clear the slot
  slot.equipped = null;
  
  // Return the unequipped gear
  return gear;
}

// Apply gear stat effects to a character
function applyGearStats(character, gear, isEquipping = true) {
  if (!character || !gear || !gear.effect) return;
  
  // Get the stat being modified and its value
  const { stat, value } = gear.effect;
  
  // Multiply by -1 if removing the gear
  const modifier = isEquipping ? value : -value;
  
  // Apply the stat change
  switch (stat) {
    case 'attack':
      character.attack = (character.attack || 0) + modifier;
      break;
    case 'defense':
      character.defense = (character.defense || 0) + modifier;
      break;
    case 'speed':
      character.speed = (character.speed || 0) + modifier;
      break;
    case 'hp':
      character.maxHp = (character.maxHp || 100) + modifier;
      break;
    case 'critRate':
      character.critRate = (character.critRate || 5) + modifier;
      break;
    case 'dodgeChance':
      character.dodgeChance = (character.dodgeChance || 0) + modifier;
      break;
  }
}

// Use a consumable item on a character
function useItem(character, item) {
  if (!character || !item) return false;
  
  // Process effect based on item type
  switch (item.effect) {
    case 'healing':
      // Heal character's HP
      const oldHP = character.hp;
      character.hp = Math.min(character.maxHp || 100, character.hp + (item.hpBoost || 0));
      return {
        success: true,
        effect: 'healing',
        amount: character.hp - oldHP,
        message: `${character.name} restored ${character.hp - oldHP} HP!`
      };
    
    case 'statusCure':
      // Reset status effect
      const hadStatus = character.statusEffect && character.statusEffect.type !== 'normal';
      
      if (character.statusEffect) {
        character.statusEffect.type = 'normal';
        character.statusEffect.duration = 0;
      }
      
      // Also heal a small amount if the item has hpBoost
      if (item.hpBoost) {
        const oldHP = character.hp;
        character.hp = Math.min(character.maxHp || 100, character.hp + item.hpBoost);
        return {
          success: true,
          effect: 'statusCure',
          clearedStatus: hadStatus,
          healing: character.hp - oldHP,
          message: `${character.name} ${hadStatus ? 'was cured of status effects and ' : ''}restored ${character.hp - oldHP} HP!`
        };
      }
      
      return {
        success: hadStatus,
        effect: 'statusCure',
        clearedStatus: hadStatus,
        message: hadStatus ? `${character.name} was cured of status effects!` : `${character.name} had no status effect to cure.`
      };
    
    case 'statBoost':
      // Apply temporary stat boost
      const statMods = character.battleMods || {};
      const stat = item.boostStat;
      
      if (stat && item.boostValue) {
        statMods[stat] = (statMods[stat] || 1) * item.boostValue;
        character.battleMods = statMods;
        
        // Set duration if the effect is temporary
        if (item.duration) {
          if (!character.activeItemEffects) character.activeItemEffects = [];
          character.activeItemEffects.push({
            effect: `${stat}Up`,
            value: item.boostValue,
            remainingDuration: item.duration
          });
        }
        
        return {
          success: true,
          effect: 'statBoost',
          stat,
          value: item.boostValue,
          message: `${character.name}'s ${stat} increased!`
        };
      }
      break;
  }
  
  return { success: false, message: "Item had no effect." };
}

// Export inventory system functions
window.InventorySystem = {
  createPlayerInventory,
  addItemToInventory,
  removeItemFromInventory,
  addGearToInventory,
  equipGear,
  unequipGear,
  applyGearStats,
  useItem
};