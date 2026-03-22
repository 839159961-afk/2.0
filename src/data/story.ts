export interface Chapter {
  id: number;
  title: string;
  content: string[];
}

export interface Collection {
  collected: string[];
  pending: string[];
}

export const storyData: {
  title: string;
  chapters: Chapter[];
  collection: Collection;
} = {
  title: "小药童的山海经日记",
  chapters: [],
  collection: {
    collected: [],
    pending: []
  }
};
