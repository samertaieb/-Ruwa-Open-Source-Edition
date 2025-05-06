import { z } from "zod";

import {
  SignInSuccessSchema,
  ProductSchema,
  QualityChartStatusSchema,
  PartnerInfoSchema,
  OrdersOnCraftSchema,
} from "./schemas";

type SignInSuccessType = z.infer<typeof SignInSuccessSchema>;

type SignUpSuccessType = z.infer<typeof SignInSuccessSchema>;
type PartnerInfo = z.infer<typeof PartnerInfoSchema>;
type QualityChartStatus = z.infer<typeof QualityChartStatusSchema>;

type Product = z.infer<typeof ProductSchema>;

type GetOrdersOnCraftResponse = z.infer<typeof OrdersOnCraftSchema>;

interface SignInAPIRequestType {
  email: string;
  password: string;
}
interface SignUpAPIRequestType {
  name: string;
  email: string;
  phone: string;
  password: string;
  birthdate_date: string;
  children_number: number;
  city: string;
  street: string;
  state_id: string;

  role: string;
  recent_activities_type?: boolean | string;
  has_already_sold_products?: string | boolean ;
}
 type SignInAPIResponse = {
  success: true;
  token: string;
  referencement: string; // "referenced", "in_progress", or "not_referenced"
};
interface UpdatePartnerInfoRequestType {
  id: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state_id?: string;
  role?: string;
  statut?: string;
  children_number?: number;
  has_quality_chart?: boolean;
  has_already_sold_products?: boolean;
  recent_activities_type?: boolean | string;
}

interface ChangeOnCraftOrderRequestType {
  price: any;
  orderId: string;
  product_qty: string;
  product_uom_qty: string;
}

interface PostOrderDenyRequestType {
  orderId: string;
  message: string;
}

export type ChangePasswordAPIRequestType = {
  oldPassword: string;
  newPassword: string;
};

export type ChangePasswordSuccessType = {
  success: boolean;
  message: string;
};

export {
  SignInSuccessType,
  SignUpSuccessType,
  SignUpAPIRequestType,
  Product,
  SignInAPIRequestType,
  UpdatePartnerInfoRequestType,
  PartnerInfo,
  PartnerInfoSchema,
  QualityChartStatusSchema,
  GetOrdersOnCraftResponse,
  ChangeOnCraftOrderRequestType,
  PostOrderDenyRequestType,
  SignInAPIResponse
};
