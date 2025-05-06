import { z } from "zod";


export const SignInSuccessSchema = z.object({
  data: z.object({
    token: z.string(),
    success: z.literal(true),
    referencement: z.string(), // Add this field
  }),
});




export const SignUpSuccessSchema = z.object({
  data: z.object({
    userId: z.string(),
    partnerId: z.string(),
    success: z.literal(true),
  }),
});

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  imageUrl: z.string().optional(),
  total_production_capacity: z.number().optional(),
  price: z.number(),
  status: z.enum(["validated", "pending", "rejected"]),
  categ_id: z.string().optional(),
});
// Partner Info Schema

export const PartnerInfoSchema = z.object({
  id: z.number().optional(),
  name: z.string().optional(),
  email: z.string().optional(),
  street: z.string().optional(),
  city: z.string().optional(),
  state_id: z.string().optional(),
  birthdate_date: z.union([z.string(), z.boolean()]).optional(),
  children_number: z.number().optional(),
  cin: z.union([z.string(), z.boolean()]).optional(),
  statut: z.string().optional(),
  referencement: z.string().optional(),
  has_quality_chart: z.boolean().optional(),
  has_already_sold_products: z.string().optional(),
  recent_activities_type: z.union([z.string(), z.boolean()]).optional(),
});

// Define the TypeScript type for PartnerInfo
export type PartnerInfo = z.infer<typeof PartnerInfoSchema>;
// Quality Chart Status Schema
export const QualityChartStatusSchema = z.object({
  success: z.boolean(),
});

export const OrdersOfferingSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      date_planned: z.union([z.string(), z.boolean()]),
      products: z.array(
        z.object({
          product_id: z.tuple([z.number(), z.string()]),
          product_qty: z.number(),
          price_unit: z.number().optional(),
        })
      ),
    })
  ),
});

export const OrdersOnCraftSchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      date_planned: z.string(),
      products: z.array(
        z.object({
          product_id: z.tuple([z.number(), z.string()]),
          product_qty: z.number(),
          price_unit: z.number().optional(),
        })
      ),
    })
  ),
});

export const OrdersOnDeliverySchema = z.object({
  data: z.array(
    z.object({
      id: z.number(),
      date_planned: z.string(),
      delivery_person_name: z.union([z.string(), z.boolean()]),
      recuperation_date: z.union([z.string(), z.boolean()]),
      date_approve: z.string(),
      products: z.array(
        z.object({
          product_id: z.tuple([z.number(), z.string()]),
          product_qty: z.number(),
          price_unit: z.number().optional(),
        })
      ),
    })
  ),
});


export const OrdersHistorySchema = z.object({
  data: z.array(
    z.object({
      name: z.string(),
      recuperation_date: z.union([z.string(), z.literal(false)]).optional(),
      products: z.array(
        z.object({
          name: z.string(),
          quantity: z.number(),
        })
      ),
      picking_states: z.array(z.string()),
      amount_total: z.number(),
      invoice: z.union([
        z.object({
          amount_total: z.number(),
          payment_state: z.string(),
          invoice_date_due: z.string(),  // Keep as string since it’s provided as such
          amount_residual_signed:z.number()

        }),
        z.literal("not_invoiced"),
      ]),
    })
  ),
});

