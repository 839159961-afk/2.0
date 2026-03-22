export type ItemType = 'food' | 'tool';

export interface Item {
  id: string;
  name: string;
  type: ItemType;
  price: number;
  description: string;
  icon: string;
}

export const ITEMS: Item[] = [
  { id: 'food_1', name: '粗面馒头', type: 'food', price: 10, description: '普通的干粮，适合短途旅行。', icon: '🥟' },
  { id: 'food_2', name: '桂花糕', type: 'food', price: 30, description: '香甜可口，能走得更远些。', icon: '🥮' },
  { id: 'food_3', name: '百草丹', type: 'food', price: 80, description: '蕴含灵气的丹药，适合前往险地。', icon: '💊' },
  { id: 'tool_1', name: '竹水筒', type: 'tool', price: 50, description: '普通的装水容器。', icon: '🎋' },
  { id: 'tool_2', name: '油纸伞', type: 'tool', price: 150, description: '遮风挡雨，去南方水乡必备。', icon: '☂️' },
  { id: 'tool_3', name: '寻妖罗盘', type: 'tool', price: 400, description: '能指引奇珍异兽的方向。', icon: '🧭' },
];

export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'snowy';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Beast {
  id: string;
  name: string;
  location: string;
  description: string;
  shanhaijingRecord: string;
  rarity: Rarity;
  weather: Weather;
  shapeSeed: number;
  colors: {
    sky: string;
    mountainFar: string;
    mountainMid: string;
    mountainNear: string;
  };
}

export interface Diary {
  id: string;
  title: string;
  content: string;
}

export const DIARIES: Diary[] = [];

export interface EncounterChoice {
  text: string;
  resultText: string;
  reward: { type: 'herbs' | 'item'; id?: string; amount: number };
}

export interface Encounter {
  id: string;
  character: string;
  title: string;
  description: string;
  choices: EncounterChoice[];
}

export const ENCOUNTERS: Encounter[] = [];

export const BEASTS: Beast[] = [];

export const MILESTONE_DIALOGUES: Record<number, string> = {};
