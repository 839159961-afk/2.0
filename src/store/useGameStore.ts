import { useState, useEffect, useCallback } from 'react';
import { ITEMS, BEASTS, ENCOUNTERS, DIARIES } from '../data/gameData';

export interface Bag {
  food: string | null;
  tool: string | null;
}

export interface GameState {
  herbs: number;
  inventory: Record<string, number>;
  bag: Bag;
  boyState: 'home' | 'traveling';
  travelEndTime: number | null;
  collection: string[];
  gardenHerbs: number;
  logs: string[];
  newSouvenir: string | null;
  acknowledgedMilestones: number[];
  activeEncounter: string | null;
  encounterHistory: string[];
  unlockedDiaries: string[];
  newDiary: string | null;
}

const loadState = (): GameState => {
  const defaultState: GameState = {
    herbs: 50,
    inventory: {},
    bag: { food: null, tool: null },
    boyState: 'home',
    travelEndTime: null,
    collection: [],
    gardenHerbs: 10,
    logs: ['药童正在屋里休息。'],
    newSouvenir: null,
    acknowledgedMilestones: [],
    activeEncounter: null,
    encounterHistory: [],
    unlockedDiaries: [],
    newDiary: null,
  };

  const saved = localStorage.getItem('youshanhai_state');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return {
        ...defaultState,
        ...parsed,
        acknowledgedMilestones: parsed.acknowledgedMilestones || [],
        activeEncounter: parsed.activeEncounter || null,
        encounterHistory: parsed.encounterHistory || [],
        unlockedDiaries: parsed.unlockedDiaries || [],
        newDiary: parsed.newDiary || null,
      };
    } catch (e) {
      console.error('Failed to load state', e);
    }
  }
  return defaultState;
};

export const useGameStore = () => {
  const [state, setState] = useState<GameState>(loadState);

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('youshanhai_state', JSON.stringify(state));
  }, [state]);

  // Game Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        let next = { ...prev };
        const now = Date.now();

        // Garden growth (10% chance every second to grow 1 herb, max 20)
        if (Math.random() < 0.1 && next.gardenHerbs < 20) {
          next.gardenHerbs += 1;
        }

        // Travel logic
        if (next.boyState === 'home' && next.bag.food) {
          // 5% chance to leave every second if food is packed
          if (Math.random() < 0.05) {
            next.boyState = 'traveling';
            const foodItem = ITEMS.find(i => i.id === next.bag.food);
            // Duration: 30s, 60s, 120s for demo purposes
            const duration = foodItem?.id === 'food_1' ? 30000 : foodItem?.id === 'food_2' ? 60000 : 120000;
            next.travelEndTime = now + duration;
            next.logs = [`药童带上${foodItem?.name}，出门游历去了。`, ...next.logs].slice(0, 10);
            next.bag = { food: null, tool: null }; // consume items
          }
        }

        // Return logic
        if (next.boyState === 'traveling' && next.travelEndTime && now >= next.travelEndTime) {
          next.boyState = 'home';
          next.travelEndTime = null;
          
          const unencountered = ENCOUNTERS.filter(e => !next.encounterHistory.includes(e.id));
          const lockedDiaries = DIARIES.filter(d => !next.unlockedDiaries.includes(d.id));
          
          const rand = Math.random();
          
          if (rand < 0.15 && unencountered.length > 0) {
            // 15% chance for a hidden encounter
            const randomEncounter = unencountered[Math.floor(Math.random() * unencountered.length)];
            next.activeEncounter = randomEncounter.id;
            next.logs = [`药童回来了！似乎在路上遇到了一位神秘人物...`, ...next.logs].slice(0, 10);
          } else if (rand < 0.575 && lockedDiaries.length > 0) {
            // 42.5% chance for a diary entry
            // Always unlock diaries in order
            const nextDiary = lockedDiaries.sort((a, b) => parseInt(a.id.slice(1)) - parseInt(b.id.slice(1)))[0];
            next.unlockedDiaries = [...next.unlockedDiaries, nextDiary.id];
            next.newDiary = nextDiary.id;
            next.logs = [`药童回来了！在灯下写下了一篇新的日记。`, ...next.logs].slice(0, 10);
          } else {
            // 42.5% chance for a beast souvenir
            const randomBeast = BEASTS[Math.floor(Math.random() * BEASTS.length)];
            if (!next.collection.includes(randomBeast.id)) {
              next.collection = [...next.collection, randomBeast.id];
            }
            
            next.logs = [`药童回来了！带回了关于【${randomBeast.name}】的见闻。`, ...next.logs].slice(0, 10);
            next.newSouvenir = randomBeast.id;
          }
        }

        return next;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const resolveEncounter = useCallback((choiceIndex: number) => {
    setState(prev => {
      if (!prev.activeEncounter) return prev;
      
      const encounter = ENCOUNTERS.find(e => e.id === prev.activeEncounter);
      if (!encounter) return prev;

      const choice = encounter.choices[choiceIndex];
      const next = { ...prev };

      // Apply reward
      if (choice.reward) {
        if (choice.reward.type === 'herbs') {
          next.herbs += choice.reward.amount;
        } else if (choice.reward.type === 'item' && choice.reward.id) {
          next.inventory = {
            ...next.inventory,
            [choice.reward.id]: (next.inventory[choice.reward.id] || 0) + choice.reward.amount
          };
        }
      }

      next.encounterHistory = [...next.encounterHistory, encounter.id];
      next.activeEncounter = null;
      next.logs = [`与【${encounter.character}】的奇遇结束了。`, ...next.logs].slice(0, 10);

      return next;
    });
  }, []);

  const harvestHerbs = useCallback(() => {
    setState(prev => {
      if (prev.gardenHerbs > 0) {
        return {
          ...prev,
          herbs: prev.herbs + prev.gardenHerbs,
          gardenHerbs: 0,
          logs: [`采摘了 ${prev.gardenHerbs} 株草药。`, ...prev.logs].slice(0, 10),
        };
      }
      return prev;
    });
  }, []);

  const buyItem = useCallback((itemId: string, price: number) => {
    setState(prev => {
      if (prev.herbs >= price) {
        return {
          ...prev,
          herbs: prev.herbs - price,
          inventory: {
            ...prev.inventory,
            [itemId]: (prev.inventory[itemId] || 0) + 1
          },
          logs: [`购买了 ${ITEMS.find(i => i.id === itemId)?.name}。`, ...prev.logs].slice(0, 10),
        };
      }
      return prev;
    });
  }, []);

  const packItem = useCallback((itemId: string, type: 'food' | 'tool') => {
    setState(prev => {
      if ((prev.inventory[itemId] || 0) > 0) {
        // If there's already an item in the bag, put it back in inventory
        const currentPacked = prev.bag[type];
        const newInventory = { ...prev.inventory };
        
        newInventory[itemId] -= 1;
        if (currentPacked) {
          newInventory[currentPacked] = (newInventory[currentPacked] || 0) + 1;
        }

        return {
          ...prev,
          inventory: newInventory,
          bag: {
            ...prev.bag,
            [type]: itemId
          }
        };
      }
      return prev;
    });
  }, []);

  const unpackItem = useCallback((type: 'food' | 'tool') => {
    setState(prev => {
      const currentPacked = prev.bag[type];
      if (currentPacked) {
        return {
          ...prev,
          inventory: {
            ...prev.inventory,
            [currentPacked]: (prev.inventory[currentPacked] || 0) + 1
          },
          bag: {
            ...prev.bag,
            [type]: null
          }
        };
      }
      return prev;
    });
  }, []);

  const clearNewSouvenir = useCallback(() => {
    setState(prev => ({ ...prev, newSouvenir: null }));
  }, []);

  const clearNewDiary = useCallback(() => {
    setState(prev => ({ ...prev, newDiary: null }));
  }, []);

  const acknowledgeMilestone = useCallback((milestone: number) => {
    setState(prev => ({
      ...prev,
      acknowledgedMilestones: [...prev.acknowledgedMilestones, milestone]
    }));
  }, []);

  return {
    state,
    harvestHerbs,
    buyItem,
    packItem,
    unpackItem,
    clearNewSouvenir,
    clearNewDiary,
    acknowledgeMilestone,
    resolveEncounter
  };
};
