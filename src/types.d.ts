type Channel = {
    id: string;
    title: string;
    images: ImagesNM;
    schedules: Schedule[];
};

type ImagesNM = {
    logo: string;
    fallback?: string;
    icon?: string;
}

type Day = {
    name: string;
    date: string;
};

type Schedule = {
    start: string;
    end: string;
    title: string;
    id: string;
    runtime?: string;
    startMinutes?: number;
    endMinutes?: number
    timeLiteral?: string;
    scheduleWidth?: number;
}

type CastCreator = {
    name: string;
    role: string;
}

type Episode = {
    id: string;
    title: string;
}

type Serie = {
    title: string;
    episodes: Episode[];
}

type ProgramData = {
  start: string;
  end: string;
  channelId: string;
  channelTitle: string;
  title: string;
  meta: {
    year: string;
    genres: string[];
    cast: CastCreator[];
    creators: CastCreator[];
  }
}