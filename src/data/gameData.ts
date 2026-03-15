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

const generateDiaries = (): Diary[] => {
  const diaries: Diary[] = [];
  
  const fixed: Record<number, {title: string, content: string}> = {
    1: {
      title: '一、清晨·启程',
      content: '天还没亮透，我就醒了。\n\n我住在南山脚下的石洞里。洞口那棵梧桐树上有只蝉，每天都是它先醒，然后叫醒我。\n\n我揉揉眼睛，爬到石案边——昨晚临睡前，我往褡裢里塞了一颗朱果、一小块黄精饼，还有阿妈留下的那只旧葫芦。阿妈说，葫芦里装的是甘渊的水，喝一口能管三天不渴。\n\n我往庭院里张望。石板上又长出几颗新灵石，发着淡淡的绿光。昨晚来过访客——石板上有一串细小的爪印，像鸟又像兽。\n\n“今天走远一点吧。”我对自己说。\n\n我把褡裢背好，想了想，又从石案上拿了一片桑皮纸包的乳蛋饼，揣进怀里。这是阿妈出门前教的：“走远了别饿着。”\n\n阿妈已经很久没回来了。\n\n我站在洞口，看着晨雾从山谷里漫上来，把梧桐树的半截身子都淹没了。我深吸一口气，空气里有青草和露水的味道。\n\n然后我迈开腿，走进了雾里。'
    },
    2: {
      title: '二、招摇山·狌狌',
      content: '沿着溪水往上走，越走雾气越淡。\n\n我认得这条路。再往上就是招摇山，山上长满了桂树，还有一种叫“祝余”的草，长得像韭菜，开青色小花，吃了就不饿。\n\n我正低头找祝余，忽然听见头顶有人笑。\n\n“嘻嘻。”\n\n我抬头，看见一只白色的猴子蹲在桂树枝上，正低头看我。那猴子长着红色的脚，耳朵又长又尖，两只眼睛亮晶晶的，像山泉水洗过的黑石子。\n\n“你是谁？”我问。\n\n“我是狌狌。”那猴子说，声音又细又脆，“我知道你是谁。你是山脚下的药童，你阿妈从前常来我这里采药。”\n\n我的眼睛一下子亮了：“你见过我阿妈？”\n\n“见过。”狌狌从树上跳下来，蹲在我面前的石头上，“她上次来的时候，说要往西边去，找一种叫‘沙棠’的果子，吃了能御水。她让我告诉你——好好看家，别乱跑。”\n\n“那她什么时候回来？”\n\n狌狌歪着头想了想：“不知道。西边很远。”\n\n它从身后掏出一颗红艳艳的果子，递给我：“这是我自己留的朱果，给你。路上吃。”\n\n我接过朱果，小心翼翼地放进褡裢里。\n\n“谢谢你，狌狌。”\n\n“不用谢。”狌狌又跳回树上，“下次来的时候，给我带点黄精饼。”\n\n说完，它钻进树叶里，不见了。'
    },
    3: {
      title: '三、青丘·九尾狐',
      content: '从招摇山下来，我沿着一条小路往东走。\n\n路越走越宽，两边的树渐渐少了，出现大片大片的青草地。远处有座山，山体泛着淡淡的粉色，像被晚霞染过。\n\n我记得阿妈说过，那是青丘山，山上有一种狐狸，长着九条尾巴，声音像婴儿唱歌。\n\n我正想着，忽然听见前面有歌声。\n\n那歌声轻轻的，柔柔的，没有词，只是一段旋律，像风吹过竹林，又像溪水流过石头。\n\n我循着声音走过去，看见一块大青石上，蹲着一只白色的狐狸。它的毛又长又软，在阳光下泛着银光，九条尾巴像九朵云，蓬蓬松松地散在身后。\n\n它闭着眼睛，对着太阳唱歌。\n\n我不敢出声，悄悄地蹲在草丛里看。\n\n九尾狐唱完一段，睁开眼，扭头看向我藏身的地方。\n\n“出来吧，小药童。”它说，声音果然像婴儿一样软糯。\n\n我红着脸从草丛里站起来。\n\n“你怎么知道我叫小药童？”\n\n“青丘山上的风告诉我的。”九尾狐从石头上跳下来，九条尾巴轻轻摆动，“你阿妈从前常来这里乘凉。她喜欢听我唱歌。”\n\n“她也听你唱歌？”\n\n“嗯。她说，我的歌让她想起很远的地方。”九尾狐走近几步，低头闻了闻我的褡裢，“你带了黄精饼？”\n\n我掏出一块黄精饼，递过去。\n\n九尾狐用嘴接过，吃得很慢，很优雅。\n\n吃完，它从尾巴上拔下一根毛，用爪子递给我。\n\n“这根毛送给你。以后遇到麻烦，就对着它喊我的名字。我叫涂涂。”\n\n我接过那根毛，银白色的，软软的，在阳光下闪着光。\n\n“谢谢你，涂涂。”\n\n“去吧。”九尾狐跳回大青石上，又闭上眼睛，“下次来，再给我带黄精饼。”'
    },
    4: {
      title: '四、不周山·烛龙',
      content: '我往西走了很久。\n\n路上遇见了长着翅膀的飞鱼，遇见了在山坡上打滚的当康，遇见了一只独脚的毕方，它站在枯树上，浑身冒着青色的火苗。\n\n天渐渐黑了。\n\n我走到一座大山脚下。这座山没有树，没有草，全是黑色的岩石，直直地插进云里。山顶看不见，因为被云遮住了。\n\n山脚下有一个巨大的山洞，洞口像一张张开的嘴。\n\n我有点怕。但我太累了，脚走不动了。我想进洞里避避风。\n\n洞口很黑，我摸出葫芦，喝了一口甘渊的水，壮了壮胆，往里走。\n\n走着走着，我看见前面有光。\n\n那光是红色的，忽明忽暗，像篝火，又不像。\n\n我悄悄走过去，看见了这一生见过的最大的东西——\n\n一条龙。\n\n它的身子比山洞还粗，盘成一座小山。它的鳞片是暗红色的，每一片都有荷叶那么大。它的头垂在地上，闭着眼睛，嘴巴里叼着一根巨大的蜡烛，烛火就是那红光。\n\n我吓得不敢动。\n\n忽然，那条龙睁开了眼睛。\n\n眼睛是金黄色的，竖着的瞳孔，像猫，但比猫大一万倍。\n\n“你是谁？”那条龙说，声音像远处的雷，闷闷的。\n\n“我……我是山脚下的小药童。”我的声音在发抖，“我……我走累了，想找个地方避避风。”\n\n那条龙看着我，看了很久。\n\n然后它又闭上眼睛，含含糊糊地说：“避吧。别出声。”\n\n我轻手轻脚地走到洞壁边，缩成一团。\n\n那条龙没有再睁眼。它的呼吸很慢，很沉，一起一伏，像潮水。\n\n我忽然想起阿妈说过的话——\n\n“最可怕的东西，往往最温柔。”\n\n我靠在洞壁上，迷迷糊糊地睡着了。'
    },
    5: {
      title: '五、回家',
      content: '我醒来的时候，洞口已经亮了。\n\n那条龙不见了。山洞里只剩下我自己。\n\n我揉揉眼睛，发现身边放着一片红色的鳞片，有巴掌大，上面压着一张纸条。\n\n纸条上歪歪扭扭地写着几个字：\n\n“给你。下次别来了。——烛龙”\n\n我把鳞片小心翼翼地装进褡裢里，走出山洞。\n\n外面阳光灿烂，不周山的岩石在阳光下闪着金色的光。\n\n我往山下走，走了很久很久。\n\n路过青丘山的时候，我把九尾狐的银毛拿出来看了看，又放回去。\n\n路过招摇山的时候，我想起狌狌的话，心想：下次一定要多带点黄精饼。\n\n天又黑了，又亮了，又黑了。\n\n我不知道走了多久。我的朱果吃完了，黄精饼也吃完了，只剩下一片乳蛋饼，我一直舍不得吃。\n\n终于，我看见了那棵梧桐树。\n\n树冠从雾里露出来，像一个老朋友在等我。\n\n我跑起来。\n\n石板上又长了几颗新灵石，发着绿光。梧桐树的树洞里，塞着一个鼓鼓囊囊的包裹。\n\n我踮起脚，把包裹拿出来。\n\n里面是一沓信，还有一个小布包。\n\n信上的字迹是阿妈的——\n\n“崽，我又去北边了。听说那边有雪，还有一种叫‘何罗鱼’的怪东西，一首十身，我想去看看。给你寄了点特产：北山的寒玉，吃了凉快；还有几条鱼干，给门口那几只猫吃。\n\n在家乖，别乱跑。\n\n阿妈”\n\n我抱着信，蹲在梧桐树下，看了很久很久。\n\n然后我站起来，把信收好，把九尾狐的银毛和烛龙的鳞片放在石案上，又把褡裢里的东西一样一样拿出来。\n\n我忽然想起，自己还没吃东西。\n\n我掏出最后那片乳蛋饼，咬了一口。\n\n饼已经有点硬了，但还是很香。\n\n我一边嚼，一边看着庭院里慢慢落下的竹叶。\n\n远处，雾又漫上来了，把梧桐树的半截身子淹没。\n\n我想：明天，把褡裢再装满一点吧。\n\n也许阿妈就回来了。\n\n也许。'
    },
    6: {
      title: '六、再出发',
      content: '阿妈没有回来。\n\n我坐在石案前，看着那三封信和北山的寒玉，咬了一大口乳蛋饼。\n\n“既然阿妈去了北边看何罗鱼，那我也要去！”我猛地站起来，对着洞口的梧桐树大声说。\n\n树上的蝉“知了”了一声，像是在赞同我。\n\n我把褡裢重新洗干净，装满了新摘的朱果和烤好的黄精饼。当然，九尾狐涂涂的银毛和烛龙大叔的鳞片也得带上。阿妈说，出门在外，朋友送的礼物就是最好的护身符。\n\n我摸了摸腰间的旧葫芦，里面装满了甘渊的水。\n\n“出发啦！”我大喊一声，迈开腿，再次走进了晨雾里。\n\n这一次，我要走得更远，去看看阿妈信里说的那些奇奇怪怪的东西！'
    },
    20: {
      title: '二十、昆仑的云',
      content: '今天终于爬上了昆仑山的一角。\n\n这里的云朵像棉花糖一样，软软的，踩上去居然不会掉下来！我遇到了一只叫白泽的神兽，它长得像只大白狗，但能说人话。它看了看我，说：“你阿妈半个月前刚从这里路过，还顺走了我两根胡须。”\n\n我羞得满脸通红，赶紧拿出一块黄精饼赔罪。白泽嚼着饼，满意地点点头：“味道不错，你可以过去啦。”\n\n大荒的神兽，原来都这么贪吃呀。'
    },
    50: {
      title: '五十、东海的浪',
      content: '走了五十天，我第一次看到大海！\n\n蓝蓝的水一直连到天上。海边有一只小鸟，叫精卫，每天都在往海里扔石头。我问她：“你不累吗？”她摇摇头：“不累呀，我在造一座桥。”\n\n我也帮她扔了两块石头。晚上，海浪拍打着沙滩，我听着海浪声睡着了，梦里阿妈牵着我的手，走在精卫造好的桥上。'
    },
    100: {
      title: '一百、归途与重逢',
      content: '第一百天。我的褡裢破了个洞，鞋底也磨平了。图鉴上画满了奇奇怪怪的异兽。\n\n我顺着南山的小路往回走，远远地，我看到了那棵熟悉的梧桐树。树下站着一个人，背着大大的药篓，正笑眯眯地看着我。\n\n“阿妈！”我大喊一声，飞奔过去扑进她怀里。\n\n“哎哟，我的小药童长高啦。”阿妈摸摸我的头，“走，回家，阿妈给你炖了百草汤。”\n\n大荒很大，异兽很多，但最好闻的味道，永远是家里的药草香。'
    }
  };

  const weathers = ['太阳暖烘烘的', '下了点小雨，我顶着一片大荷叶', '起风了，吹得我像个小陀螺', '阴天，云彩像一块大大的灰抹布', '清晨起了大雾，什么都看不清', '天气真好，天空蓝得像阿妈的染布'];
  const locations = ['不知名的野花谷', '长满发光蘑菇的幽暗森林', '一条清澈见底的小溪边', '长满参天大树的古老密林', '一片金灿灿的沙漠边缘', '长满奇花异草的百草园', '一座长得像蘑菇的小山包', '飘着彩色泡泡的泥潭', '全是水晶的地下溶洞'];
  
  const events = [
    '遇到了一只长着三个尾巴的小松鼠，它抢了我的半块黄精饼，结果被噎得直打嗝。我赶紧给它喂了口甘渊的水，它红着脸跑了。',
    '今天看到一只长得像小猪的野兽，阿妈图鉴上说叫当康。它在泥坑里打滚，非要拉着我一起。我才不干呢，衣服脏了阿妈会骂的！',
    '有一只只有一只翅膀的鸟落在我的肩膀上，叽叽喳喳叫个不停。我问它另一半呢？它用翅膀指了指天上，原来另一只在云朵里睡大觉！',
    '在溪边洗脸的时候，水里冒出一个长着人脸的小鱼。它吐了个泡泡，把我吓了一跳，一屁股坐在了泥巴上。它居然还在水里“咯咯”地笑！',
    '今天走到了一片没有影子的树林。树叶是透明的，风一吹就像风铃一样响。我在树下睡了一觉，梦见自己长出了翅膀。',
    '远远地看到了一座会走路的山！仔细一看，原来是一只巨大无比的乌龟背着一座小岛。大荒真的太神奇了！',
    '晚上迷路了，正害怕的时候，一只浑身发光的白鹿走了过来。它用角蹭了蹭我，在前面带路，把我领到了一个避风的山洞。',
    '天上掉下来一根五彩的羽毛，比我整个人还要大！我把它当被子盖，晚上做梦都是甜甜的桃花味。',
    '遇到了一只长着羊角的老虎，张着大嘴要吃我。我吓得赶紧塞给它一颗最酸的野果。它酸得眼泪都出来了，连连摆手跑掉了。哈哈！',
    '今天刮大风，一只大鸟把我抓到了半空中！我吓得大叫，结果它只是把我放在了一个长满甜果子的悬崖上，原来它是想请我吃下午茶呀。',
    '发现了一个树洞，里面全是亮晶晶的石头。我刚想捡一块，一只长着六条腿的小兽跳出来，气鼓鼓地看着我。我只好拿一颗朱果跟它换了一块小石头。',
    '今天遇到了一群会跳舞的草！我一唱歌，它们就跟着扭来扭去。我唱了一下午，嗓子都哑了，但真的好开心。',
    '路过一片沼泽，看到一只长着九个脑袋的蛇在吵架。原来是它的九个脑袋在争论今天中午吃什么。我偷偷溜走了，免得它们把我当午餐。',
    '在山顶上看到了一只浑身冒火的鸟（毕方）。它单脚站着，看起来很酷。我扔给它一块木头，它一口火就把木头烧成了灰，真厉害！',
    '今天下雨了，我躲在一个大蘑菇下面。一只长着翅膀的小鱼飞过来，和我一起躲雨。我们俩大眼瞪小眼，谁也没说话。',
    '踩到了一块软绵绵的石头，结果石头“哎哟”叫了一声跑了。原来是一只伪装成石头的胖蛤蟆！',
    '今天看到天上飞过一条像鱼一样的龙，它飞过的地方下起了花瓣雨。我接住了一片花瓣，吃起来居然是甜的。',
    '遇到了一只一直在哭的小兽，眼泪都快汇成小河了。我给它讲了个阿妈教我的笑话，它终于破涕为笑，送了我一朵永不凋谢的花。',
    '在一棵大树下发现了一个鸟窝，里面有几颗金色的蛋。我没敢碰，只是在旁边放了点碎饼干，希望小鸟孵出来有的吃。',
    '今天好险！差点掉进一个深坑里，幸好一条长长的藤蔓把我拉了上来。仔细一看，那藤蔓居然是一条绿色的蛇！我连声道谢，它吐了吐信子游走了。'
  ];

  const outros = [
    '不知道阿妈现在走到哪里了，有没有遇到好玩的事情。',
    '褡裢里的干粮不多了，明天得找点野果子吃。',
    '今天也是勇敢的小药童！晚安，大荒。',
    '摸了摸怀里的九尾狐毛，感觉一点都不怕黑了。',
    '把今天的故事记下来，以后讲给阿妈听。',
    '脚底磨出了一个水泡，有点疼，但我能坚持！',
    '大荒的星星真亮啊，像阿妈温柔的眼睛。',
    '打了个哈欠，好困好困，明天再继续走吧。',
    '摸了摸烛龙大叔的鳞片，感觉身上暖洋洋的。',
    '今天采到了好多稀有的草药，阿妈看到一定会夸我的！'
  ];

  const numberMap = ['零','一','二','三','四','五','六','七','八','九','十'];
  const getChineseNumber = (num: number) => {
    if (num === 100) return '一百';
    if (num <= 10) return numberMap[num];
    if (num < 20) return '十' + (num % 10 === 0 ? '' : numberMap[num % 10]);
    if (num % 10 === 0) return numberMap[Math.floor(num / 10)] + '十';
    return numberMap[Math.floor(num / 10)] + '十' + numberMap[num % 10];
  };

  for (let i = 1; i <= 100; i++) {
    if (fixed[i]) {
      diaries.push({ id: `d${i}`, title: fixed[i].title, content: fixed[i].content });
      continue;
    }

    const w = weathers[i % weathers.length];
    const l = locations[(i * 3) % locations.length];
    const e = events[(i * 7) % events.length];
    const o = outros[(i * 11) % outros.length];

    const title = `${getChineseNumber(i)}、${l.substring(0, 4)}...`;
    const content = `今天${w}。我走到了${l}。\n\n${e}\n\n${o}`;

    diaries.push({ id: `d${i}`, title, content });
  }

  return diaries;
};

export const DIARIES: Diary[] = generateDiaries();

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
