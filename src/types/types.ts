export type UserDataType = {
  id:string;
  email: string;
  firstConnect: boolean;
  firstDay: string;
  firstPoids?: number;
  jours: dayType[];
}

export type dayType={
  checked: boolean;
  jour: number;
  poids?: number;
  valid:boolean;
}


export type FastingType = 'fasting' | 'not-fasting' | 'unknown';