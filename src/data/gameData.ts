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

export const ENCOUNTERS: Encounter[] = [
  {
    id: 'e1',
    character: '帝俊',
    title: '日月之父',
    description: '你在一处高山上，见到一位浑身散发着日月光辉的神明。他自称帝俊，正俯瞰着大荒的众生。他问你：“凡人，你在这山海间游历，所求为何？”',
    choices: [
      { text: '求长生不老', resultText: '帝俊微微摇头：“长生亦有尽头，不如顺应天道。”他赐予你一些草药，便化作流光消失了。', reward: { type: 'herbs', amount: 100 } },
      { text: '求见识万物', resultText: '帝俊大笑：“好一个见识万物！这大荒正需要你这样的记录者。”他赐予你一件行囊。', reward: { type: 'item', id: 'tool_3', amount: 1 } }
    ]
  },
  {
    id: 'e2',
    character: '炎帝',
    title: '神农尝百草',
    description: '你遇到一位面容慈祥的老者，他正在仔细辨认一株奇异的毒草。他便是炎帝神农氏。他看到你背着药篓，便问：“小友，你可知这株草的药性？”',
    choices: [
      { text: '虚心请教', resultText: '炎帝耐心地为你讲解了百草的相生相克之理，你受益匪浅，采集草药的技巧提升了。', reward: { type: 'herbs', amount: 200 } },
      { text: '献上自己的草药', resultText: '炎帝赞赏你的慷慨，回赠了你一颗珍贵的丹药。', reward: { type: 'item', id: 'food_3', amount: 1 } }
    ]
  },
  {
    id: 'e3',
    character: '黄帝',
    title: '轩辕之威',
    description: '在一处古战场遗迹，你见到一位威严的帝王，佩剑而立。黄帝轩辕氏正在回忆昔日涿鹿之战。他看向你：“和平来之不易，你当如何守护？”',
    choices: [
      { text: '以仁德服人', resultText: '黄帝点头：“仁德乃王道之本。”他赐予你一些盘缠。', reward: { type: 'herbs', amount: 150 } },
      { text: '以武力震慑', resultText: '黄帝叹息：“武力虽能止戈，却非长久之计。”他给了你一些干粮，劝你多去看看这大好河山。', reward: { type: 'item', id: 'food_2', amount: 2 } }
    ]
  },
  {
    id: 'e4',
    character: '精卫',
    title: '填海之志',
    description: '东海之滨，你看到一只小鸟衔着树枝和石块，投入波涛汹涌的大海。她是炎帝之女女娃化身的精卫。她问你：“我的努力，真的有意义吗？”',
    choices: [
      { text: '精诚所至，金石为开', resultText: '精卫的眼中闪过一丝明亮：“谢谢你，我会继续坚持下去的。”她送给你一根带有灵气的羽毛（换取了草药）。', reward: { type: 'herbs', amount: 120 } },
      { text: '大海无量，不如放弃', resultText: '精卫没有理会你，继续衔起石块飞向大海。你在海边捡到了一些遗落的物资。', reward: { type: 'item', id: 'tool_1', amount: 1 } }
    ]
  },
  {
    id: 'e5',
    character: '夸父',
    title: '逐日之渴',
    description: '大荒之中，你遇到一个如山般高大的巨人，他正气喘吁吁地朝着太阳奔跑。夸父停下脚步，声音如雷：“小友，你可有水解渴？”',
    choices: [
      { text: '献上竹水筒', resultText: '夸父一饮而尽，大笑道：“痛快！这水筒还你，我已在其中注入了大地之力！”', reward: { type: 'item', id: 'tool_1', amount: 3 } },
      { text: '指引前方的大河', resultText: '夸父顺着你指的方向狂奔而去，在原地留下了一些他采集的珍稀草药。', reward: { type: 'herbs', amount: 180 } }
    ]
  },
  {
    id: 'e6',
    character: '刑天',
    title: '猛志固常在',
    description: '常羊山下，你见到一个没有头颅的巨人，以双乳为眼，肚脐为嘴，挥舞着干戚。刑天发出怒吼：“天帝不公！你可愿助我一臂之力？”',
    choices: [
      { text: '敬佩其勇猛', resultText: '刑天感受到你的敬意，停止了挥舞：“我的战斗属于我自己，你且去吧。”他留下了一株沾染战意的灵草。', reward: { type: 'herbs', amount: 250 } },
      { text: '劝其放下执念', resultText: '刑天怒吼一声，震耳欲聋，但随后又陷入了沉默。你在他离开的地方发现了一些物资。', reward: { type: 'item', id: 'food_3', amount: 1 } }
    ]
  },
  {
    id: 'e7',
    character: '蚩尤',
    title: '兵主之怒',
    description: '迷雾中，你遇到一位铜头铁额、生有八臂的战神。蚩尤看着你，冷冷地说：“胜者为王，败者为寇。历史由胜利者书写，你这记录者，可会写下真相？”',
    choices: [
      { text: '如实记录所见所闻', resultText: '蚩尤大笑：“好！只要你不违背本心！”他随手扔给你一些战利品。', reward: { type: 'herbs', amount: 300 } },
      { text: '历史自有后人评说', resultText: '蚩尤冷哼一声，转身隐入迷雾之中。你捡到了他掉落的干粮。', reward: { type: 'item', id: 'food_1', amount: 5 } }
    ]
  },
  {
    id: 'e8',
    character: '女娲',
    title: '造化之恩',
    description: '在一处五彩斑斓的祭坛旁，你见到一位人首蛇身的女神。女娲正温柔地注视着大地上生息的万物。她轻声问：“我的孩子们，如今过得可好？”',
    choices: [
      { text: '生生不息，繁荣昌盛', resultText: '女娲露出欣慰的笑容：“那便好。”她赐予你造化之气，你感觉神清气爽。', reward: { type: 'herbs', amount: 500 } },
      { text: '天灾人祸，苦难颇多', resultText: '女娲叹息一声：“苦难亦是修行。”她赐予你一把油纸伞，希望能为你遮风挡雨。', reward: { type: 'item', id: 'tool_2', amount: 1 } }
    ]
  },
  {
    id: 'e9',
    character: '后羿',
    title: '射日之弓',
    description: '你遇到一位英武的男子，背着一把巨大的红色的弓。后羿望着天空，似乎在怀念着什么。他问你：“若天空再次出现十个太阳，你当如何？”',
    choices: [
      { text: '寻找英雄射日', resultText: '后羿苦笑：“英雄也会累的。”他送给你一些他打猎得来的物资。', reward: { type: 'item', id: 'food_2', amount: 3 } },
      { text: '尽己所能，拯救苍生', resultText: '后羿赞赏地看着你：“有此心便足够了。”他传授了你一些在荒野生存的技巧。', reward: { type: 'herbs', amount: 200 } }
    ]
  },
  {
    id: 'e10',
    character: '大禹',
    title: '定海神针',
    description: '在一处治水工地上，你见到一位形容憔悴但目光坚毅的男子。大禹正指挥着民众疏导洪水。他问你：“水患未平，何以为家？”',
    choices: [
      { text: '愿尽绵薄之力', resultText: '大禹感激地点头：“多一个人便多一份力量。”你在治水过程中发现了一些珍贵的草药。', reward: { type: 'herbs', amount: 150 } },
      { text: '治水乃千秋之业', resultText: '大禹叹道：“只盼后人不再受水患之苦。”他送给你一个寻妖罗盘，希望你旅途平安。', reward: { type: 'item', id: 'tool_3', amount: 1 } }
    ]
  }
];

// Generate 300 beasts
const generateBeasts = (): Beast[] => {
  const baseBeasts: Omit<Beast, 'id' | 'shapeSeed' | 'shanhaijingRecord'>[] = [
    { name: '九尾狐', location: '青丘之山', description: '其状如狐而九尾，其音如婴儿，能食人，食者不蛊。', rarity: 'epic', weather: 'sunny', colors: { sky: '#fce4d6', mountainFar: '#e6a8d7', mountainMid: '#c77b9d', mountainNear: '#9e4770' } },
    { name: '狌狌', location: '招摇之山', description: '其状如禺而白耳，伏行人走，其名曰狌狌，食之善走。', rarity: 'rare', weather: 'sunny', colors: { sky: '#fef3c7', mountainFar: '#fcd34d', mountainMid: '#f59e0b', mountainNear: '#b45309' } },
    { name: '烛龙', location: '钟山', description: '视为昼，瞑为夜，吹为冬，呼为夏，不饮，不食，不息，息为风。', rarity: 'legendary', weather: 'snowy', colors: { sky: '#f3e8ff', mountainFar: '#d8b4fe', mountainMid: '#9333ea', mountainNear: '#581c87' } },
    { name: '何罗鱼', location: '谯明之山', description: '一首而十身，其音如吠犬，食之已痈。', rarity: 'epic', weather: 'rainy', colors: { sky: '#dbeafe', mountainFar: '#93c5fd', mountainMid: '#3b82f6', mountainNear: '#1e3a8a' } },
    { name: '飞鱼', location: '劳山', description: '其状如豚而赤文，服之不畏雷，可以御兵。', rarity: 'rare', weather: 'cloudy', colors: { sky: '#e0f2fe', mountainFar: '#7dd3fc', mountainMid: '#38bdf8', mountainNear: '#0284c7' } },
    { name: '帝江', location: '天山', description: '其状如黄囊，赤如丹火，六足四翼，浑敦无面目，是识歌舞。', rarity: 'rare', weather: 'cloudy', colors: { sky: '#fde0c5', mountainFar: '#f4a261', mountainMid: '#e76f51', mountainNear: '#8a3a3a' } },
    { name: '白泽', location: '昆仑山', description: '浑身雪白，能说人话，通万物之情，晓天下万物状貌。', rarity: 'legendary', weather: 'snowy', colors: { sky: '#e2e8f0', mountainFar: '#cbd5e1', mountainMid: '#94a3b8', mountainNear: '#475569' } },
    { name: '精卫', location: '发鸠之山', description: '其状如乌，文首，白喙，赤足，名曰“精卫”，其鸣自詨。', rarity: 'common', weather: 'rainy', colors: { sky: '#dbeafe', mountainFar: '#93c5fd', mountainMid: '#3b82f6', mountainNear: '#1e3a8a' } },
    { name: '饕餮', location: '钩吾之山', description: '羊身人面，其目在腋下，虎齿人爪，其音如婴儿。', rarity: 'rare', weather: 'cloudy', colors: { sky: '#dcfce7', mountainFar: '#86efac', mountainMid: '#22c55e', mountainNear: '#14532d' } },
    { name: '当康', location: '钦山', description: '其状如豚而有牙，其名曰当康，其鸣自叫，见则天下大穰。', rarity: 'common', weather: 'sunny', colors: { sky: '#fef3c7', mountainFar: '#fcd34d', mountainMid: '#f59e0b', mountainNear: '#b45309' } },
    { name: '比翼鸟', location: '结匈国', description: '其状如凫，一翼一目，相得乃飞，名曰蛮蛮。', rarity: 'common', weather: 'sunny', colors: { sky: '#cffafe', mountainFar: '#67e8f9', mountainMid: '#06b6d4', mountainNear: '#155e75' } },
    { name: '毕方', location: '章莪之山', description: '其状如鹤，一足，赤文青质而白喙，名曰毕方，其鸣自叫也。', rarity: 'rare', weather: 'sunny', colors: { sky: '#ffedd5', mountainFar: '#fdba74', mountainMid: '#ea580c', mountainNear: '#9a3412' } },
    { name: '夫诸', location: '敖岸之山', description: '其状如白鹿而四角，名曰夫诸，见则其邑大水。', rarity: 'rare', weather: 'rainy', colors: { sky: '#f1f5f9', mountainFar: '#cbd5e1', mountainMid: '#64748b', mountainNear: '#334155' } },
    { name: '乘黄', location: '白民之国', description: '其状如狐，其背上有角，乘之寿二千岁。', rarity: 'epic', weather: 'sunny', colors: { sky: '#fef9c3', mountainFar: '#fde047', mountainMid: '#eab308', mountainNear: '#854d0e' } },
    { name: '陆吾', location: '昆仑之丘', description: '其神状虎身而九尾，人面而虎爪；是神也，司天之九部及帝之囿时。', rarity: 'epic', weather: 'snowy', colors: { sky: '#ffedd5', mountainFar: '#fdba74', mountainMid: '#d97706', mountainNear: '#78350f' } },
  ];

  const generated: Beast[] = [];
  const directions = ['东', '南', '西', '北', '中'];
  const shapes = ['犬而人面', '羊身人面', '狐而九尾', '马身而鸟翼', '牛而白首', '彘而人面', '鸟而鼠尾', '蛇而六足', '龟而鸟首'];
  const sounds = ['婴儿啼哭', '击石之声', '犬吠', '雷鸣', '风啸', '钟磬之音', '流水之声', '女子呼救'];
  const effects = ['不畏雷电', '可以御凶', '不迷失方向', '治愈百病', '延年益寿', '使人不惑', '使人多力', '防水火之灾'];
  
  // Add base beasts first
  baseBeasts.forEach((beast, index) => {
    const dir = directions[index % directions.length];
    const dist = (index * 100 + 300) % 1000;
    const effect = effects[index % effects.length];
    const shanhaijingRecord = `《山海经·${dir}山经》云：又${dir}${dist}里，曰${beast.location}。有兽焉，${beast.description}，佩之${effect}。`;
    
    generated.push({
      ...beast,
      id: `b${index + 1}`,
      shapeSeed: index * 100,
      shanhaijingRecord
    });
  });

  // Generate the rest up to 300
  const prefixes = ['玄', '赤', '青', '白', '幽', '灵', '幻', '冥', '天', '地', '金', '木', '水', '火', '土', '风', '雷', '冰', '暗', '光'];
  const suffixes = ['兽', '鸟', '鱼', '龙', '狐', '鹿', '虎', '鹤', '蛇', '龟', '猿', '狼', '熊', '豹', '鹰', '蝶', '蛛', '蝎', '蜈', '蟾'];
  const locations = ['不周山', '流沙河', '弱水', '建木', '归墟', '雷泽', '云梦泽', '大荒', '幽都', '扶桑', '昆仑墟', '蓬莱岛', '方丈山', '瀛洲', '汤谷', '羽民国', '厌火国', '三首国', '长臂国', '奇肱国'];
  const weathers: Weather[] = ['sunny', 'rainy', 'cloudy', 'snowy'];

  for (let i = baseBeasts.length; i < 300; i++) {
    const prefix = prefixes[i % prefixes.length];
    const suffix = suffixes[(i * 3) % suffixes.length];
    const location = locations[(i * 7) % locations.length];
    const weather = weathers[i % weathers.length];
    
    // Determine rarity (mostly common, some rare, few epic, very few legendary)
    let rarity: Rarity = 'common';
    if (i % 50 === 0) rarity = 'legendary';
    else if (i % 20 === 0) rarity = 'epic';
    else if (i % 5 === 0) rarity = 'rare';

    // Generate colors based on weather and a bit of randomness
    let colors = { sky: '#f0ece1', mountainFar: '#d3cbb8', mountainMid: '#a39b88', mountainNear: '#6b7072' };
    
    const hueOffset = (i * 13) % 360;
    
    if (weather === 'sunny') {
      colors = { 
        sky: `hsl(${hueOffset}, 70%, 90%)`, 
        mountainFar: `hsl(${hueOffset}, 60%, 75%)`, 
        mountainMid: `hsl(${hueOffset}, 50%, 60%)`, 
        mountainNear: `hsl(${hueOffset}, 40%, 45%)` 
      };
    } else if (weather === 'rainy') {
      colors = { 
        sky: `hsl(${hueOffset}, 40%, 85%)`, 
        mountainFar: `hsl(${hueOffset}, 50%, 70%)`, 
        mountainMid: `hsl(${hueOffset}, 60%, 55%)`, 
        mountainNear: `hsl(${hueOffset}, 70%, 40%)` 
      };
    } else if (weather === 'snowy') {
      colors = { 
        sky: `hsl(${hueOffset}, 20%, 95%)`, 
        mountainFar: `hsl(${hueOffset}, 30%, 85%)`, 
        mountainMid: `hsl(${hueOffset}, 40%, 70%)`, 
        mountainNear: `hsl(${hueOffset}, 50%, 55%)` 
      };
    } else if (weather === 'cloudy') {
      colors = { 
        sky: `hsl(${hueOffset}, 10%, 90%)`, 
        mountainFar: `hsl(${hueOffset}, 15%, 75%)`, 
        mountainMid: `hsl(${hueOffset}, 20%, 60%)`, 
        mountainNear: `hsl(${hueOffset}, 25%, 45%)` 
      };
    }

    const dir = directions[i % directions.length];
    const dist = (i * 50 + 100) % 2000;
    const shape = shapes[i % shapes.length];
    const sound = sounds[(i * 3) % sounds.length];
    const effect = effects[(i * 5) % effects.length];
    
    const shanhaijingRecord = `《山海经·${dir}山经》云：又${dir}${dist}里，曰${location}。有兽焉，其状如${shape}，名曰${prefix}${suffix}，其音如${sound}，食之${effect}。`;

    generated.push({
      id: `b${i + 1}`,
      name: `${prefix}${suffix}`,
      location: location,
      description: `古籍记载，此物生于${location}，性情难测。`,
      shanhaijingRecord,
      rarity,
      weather,
      shapeSeed: i * 137,
      colors
    });
  }

  return generated;
};

export const BEASTS: Beast[] = generateBeasts();

export const MILESTONE_DIALOGUES: Record<number, string> = {
  10: "师傅，我已经收集了10种异兽了！这大荒世界真是无奇不有！",
  20: "20种了！我发现有些异兽只在特定的天气出现呢。",
  30: "30种异兽的图鉴，感觉我的画技都精进了不少。",
  40: "师傅说集齐百种就能知晓天地奥秘，我已经收集了40种了。",
  50: "50种！图鉴已经写满好几卷了，行囊越来越沉了。",
  60: "60种异兽，我甚至遇到了一些传说中的神兽，虽然只是远远看了一眼。",
  70: "70种了，大荒的每个角落似乎都藏着秘密。",
  80: "80种，我开始能听懂一些异兽的语言了，它们也有自己的悲欢。",
  90: "90种！离百种大关只差一步之遥了！",
  100: "100种异兽！师傅，我做到了！但这只是开始，大荒还有更多未知。",
  150: "150种了，我已经走遍了名山大川，见识了太多的不可思议。",
  200: "200种异兽图鉴，这世上恐怕没几个人见过这么多奇珍异兽吧。",
  250: "250种，寻找剩下的异兽越来越难了，但我不会放弃的。",
  300: "300种！山海图鉴已然大成！师傅，我已经看遍了这山海间的奇迹！"
};
