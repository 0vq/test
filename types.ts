
export interface Account {
  id: number;
  service: string;
  email: string;
  pass: string;
  img: string;
  tags?: string[];
}

export interface SecurityAdvice {
  score: number;
  recommendations: string[];
}

export type PlanType = 'sentinel' | 'guardian' | 'apex' | null;

// Added icon property to match the data used in PricingSection
export interface SubscriptionPlan {
    id: PlanType;
    name: string;
    price: string;
    description: string;
    features: string[];
    highlight?: boolean;
    color: string;
    icon: string;
}
