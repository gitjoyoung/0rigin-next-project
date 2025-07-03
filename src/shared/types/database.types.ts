export type Json =
   | string
   | number
   | boolean
   | null
   | { [key: string]: Json | undefined }
   | Json[]

export type Database = {
   public: {
      Tables: {
         categories: {
            Row: {
               can_write: boolean
               created_at: string
               description: string | null
               icon: string | null
               id: string
               is_active: boolean | null
               name: string
               order_index: number | null
               slug: string
               updated_at: string
            }
            Insert: {
               can_write?: boolean
               created_at?: string
               description?: string | null
               icon?: string | null
               id?: string
               is_active?: boolean | null
               name: string
               order_index?: number | null
               slug: string
               updated_at?: string
            }
            Update: {
               can_write?: boolean
               created_at?: string
               description?: string | null
               icon?: string | null
               id?: string
               is_active?: boolean | null
               name?: string
               order_index?: number | null
               slug?: string
               updated_at?: string
            }
            Relationships: []
         }
         comments: {
            Row: {
               author_id: string | null
               content: string
               created_at: string
               depth: number
               id: number
               is_approved: boolean
               is_edited: boolean
               is_guest: boolean
               likes: number
               nickname: string
               parent_id: number | null
               password: string | null
               post_id: number
               updated_at: string | null
            }
            Insert: {
               author_id?: string | null
               content: string
               created_at?: string
               depth?: number
               id?: number
               is_approved?: boolean
               is_edited?: boolean
               is_guest?: boolean
               likes?: number
               nickname: string
               parent_id?: number | null
               password?: string | null
               post_id: number
               updated_at?: string | null
            }
            Update: {
               author_id?: string | null
               content?: string
               created_at?: string
               depth?: number
               id?: number
               is_approved?: boolean
               is_edited?: boolean
               is_guest?: boolean
               likes?: number
               nickname?: string
               parent_id?: number | null
               password?: string | null
               post_id?: number
               updated_at?: string | null
            }
            Relationships: [
               {
                  foreignKeyName: 'comments_parent_id_fkey'
                  columns: ['parent_id']
                  isOneToOne: false
                  referencedRelation: 'comments'
                  referencedColumns: ['id']
               },
            ]
         }
         daily_stats: {
            Row: {
               created_at: string
               date: string
               id: number
               post_count: number
               updated_at: string
               user_count: number
               visitor_count: number
            }
            Insert: {
               created_at?: string
               date: string
               id?: number
               post_count?: number
               updated_at?: string
               user_count?: number
               visitor_count?: number
            }
            Update: {
               created_at?: string
               date?: string
               id?: number
               post_count?: number
               updated_at?: string
               user_count?: number
               visitor_count?: number
            }
            Relationships: []
         }
         points: {
            Row: {
               created_at: string | null
               earned_at: string | null
               id: number
               points: number
               source: string
               user_id: string
            }
            Insert: {
               created_at?: string | null
               earned_at?: string | null
               id?: never
               points: number
               source: string
               user_id: string
            }
            Update: {
               created_at?: string | null
               earned_at?: string | null
               id?: never
               points?: number
               source?: string
               user_id?: string
            }
            Relationships: []
         }
         post_likes: {
            Row: {
               anon_key: string | null
               created_at: string
               deleted_at: string | null
               id: string
               post_id: number
               user_id: string | null
            }
            Insert: {
               anon_key?: string | null
               created_at?: string
               deleted_at?: string | null
               id?: string
               post_id: number
               user_id?: string | null
            }
            Update: {
               anon_key?: string | null
               created_at?: string
               deleted_at?: string | null
               id?: string
               post_id?: number
               user_id?: string | null
            }
            Relationships: []
         }
         posts: {
            Row: {
               author_id: string | null
               category: string | null
               category_id: string | null
               content: Json
               created_at: string
               excerpt: string | null
               id: number
               is_pinned: boolean
               nickname: string | null
               password: string | null
               reading_time: number | null
               slug: string | null
               status: string
               summary: string | null
               tags: string[] | null
               thumbnail: string | null
               title: string
               updated_at: string | null
               view_count: number
            }
            Insert: {
               author_id?: string | null
               category?: string | null
               category_id?: string | null
               content: Json
               created_at?: string
               excerpt?: string | null
               id?: number
               is_pinned?: boolean
               nickname?: string | null
               password?: string | null
               reading_time?: number | null
               slug?: string | null
               status?: string
               summary?: string | null
               tags?: string[] | null
               thumbnail?: string | null
               title: string
               updated_at?: string | null
               view_count?: number
            }
            Update: {
               author_id?: string | null
               category?: string | null
               category_id?: string | null
               content?: Json
               created_at?: string
               excerpt?: string | null
               id?: number
               is_pinned?: boolean
               nickname?: string | null
               password?: string | null
               reading_time?: number | null
               slug?: string | null
               status?: string
               summary?: string | null
               tags?: string[] | null
               thumbnail?: string | null
               title?: string
               updated_at?: string | null
               view_count?: number
            }
            Relationships: [
               {
                  foreignKeyName: 'fk_category'
                  columns: ['category_id']
                  isOneToOne: false
                  referencedRelation: 'categories'
                  referencedColumns: ['id']
               },
            ]
         }
         profile: {
            Row: {
               avatar_url: string | null
               bio: string | null
               created_at: string | null
               email: string
               gender: string | null
               id: string
               is_active: boolean | null
               is_email_verified: boolean | null
               last_login_at: string | null
               nickname: string
               signup_complete: boolean | null
               updated_at: string | null
            }
            Insert: {
               avatar_url?: string | null
               bio?: string | null
               created_at?: string | null
               email: string
               gender?: string | null
               id: string
               is_active?: boolean | null
               is_email_verified?: boolean | null
               last_login_at?: string | null
               nickname: string
               signup_complete?: boolean | null
               updated_at?: string | null
            }
            Update: {
               avatar_url?: string | null
               bio?: string | null
               created_at?: string | null
               email?: string
               gender?: string | null
               id?: string
               is_active?: boolean | null
               is_email_verified?: boolean | null
               last_login_at?: string | null
               nickname?: string
               signup_complete?: boolean | null
               updated_at?: string | null
            }
            Relationships: []
         }
         quiz_answers: {
            Row: {
               attempt_id: number
               id: number
               is_correct: boolean
               question_id: number
               selected_option: number
               time_spent: number | null
            }
            Insert: {
               attempt_id: number
               id?: number
               is_correct: boolean
               question_id: number
               selected_option: number
               time_spent?: number | null
            }
            Update: {
               attempt_id?: number
               id?: number
               is_correct?: boolean
               question_id?: number
               selected_option?: number
               time_spent?: number | null
            }
            Relationships: [
               {
                  foreignKeyName: 'quiz_answers_attempt_id_fkey'
                  columns: ['attempt_id']
                  isOneToOne: false
                  referencedRelation: 'quiz_attempts'
                  referencedColumns: ['id']
               },
               {
                  foreignKeyName: 'quiz_answers_question_id_fkey'
                  columns: ['question_id']
                  isOneToOne: false
                  referencedRelation: 'quiz_questions'
                  referencedColumns: ['id']
               },
            ]
         }
         quiz_attempts: {
            Row: {
               completed_at: string | null
               correct_answers: number | null
               id: number
               passed: boolean | null
               quiz_id: number
               score: number | null
               started_at: string
               total_questions: number
               user_id: string
            }
            Insert: {
               completed_at?: string | null
               correct_answers?: number | null
               id?: number
               passed?: boolean | null
               quiz_id: number
               score?: number | null
               started_at?: string
               total_questions: number
               user_id: string
            }
            Update: {
               completed_at?: string | null
               correct_answers?: number | null
               id?: number
               passed?: boolean | null
               quiz_id?: number
               score?: number | null
               started_at?: string
               total_questions?: number
               user_id?: string
            }
            Relationships: [
               {
                  foreignKeyName: 'quiz_attempts_quiz_id_fkey'
                  columns: ['quiz_id']
                  isOneToOne: false
                  referencedRelation: 'quizzes'
                  referencedColumns: ['id']
               },
            ]
         }
         quiz_questions: {
            Row: {
               correct_answer: number
               explanation: string | null
               id: number
               media_url: string | null
               option_1: string
               option_2: string
               option_3: string | null
               option_4: string | null
               option_5: string | null
               option_count: number
               points: number
               question_number: number
               question_text: string
               question_type: string
               quiz_id: number
            }
            Insert: {
               correct_answer: number
               explanation?: string | null
               id?: number
               media_url?: string | null
               option_1: string
               option_2: string
               option_3?: string | null
               option_4?: string | null
               option_5?: string | null
               option_count: number
               points?: number
               question_number: number
               question_text: string
               question_type?: string
               quiz_id: number
            }
            Update: {
               correct_answer?: number
               explanation?: string | null
               id?: number
               media_url?: string | null
               option_1?: string
               option_2?: string
               option_3?: string | null
               option_4?: string | null
               option_5?: string | null
               option_count?: number
               points?: number
               question_number?: number
               question_text?: string
               question_type?: string
               quiz_id?: number
            }
            Relationships: [
               {
                  foreignKeyName: 'quiz_questions_quiz_id_fkey'
                  columns: ['quiz_id']
                  isOneToOne: false
                  referencedRelation: 'quizzes'
                  referencedColumns: ['id']
               },
            ]
         }
         quizzes: {
            Row: {
               author_id: string | null
               created_at: string
               description: string | null
               id: number
               is_public: boolean
               pass_score: number | null
               time_limit: number | null
               title: string
               updated_at: string | null
            }
            Insert: {
               author_id?: string | null
               created_at?: string
               description?: string | null
               id?: number
               is_public?: boolean
               pass_score?: number | null
               time_limit?: number | null
               title: string
               updated_at?: string | null
            }
            Update: {
               author_id?: string | null
               created_at?: string
               description?: string | null
               id?: number
               is_public?: boolean
               pass_score?: number | null
               time_limit?: number | null
               title?: string
               updated_at?: string | null
            }
            Relationships: []
         }
         visitors: {
            Row: {
               browser: string | null
               device_type: string | null
               id: number
               ip_address: string | null
               language: string | null
               os: string | null
               page_url: string
               referrer: string | null
               screen_size: string | null
               visit_date: string
               visit_timestamp: string
               visitor_id: string
            }
            Insert: {
               browser?: string | null
               device_type?: string | null
               id?: number
               ip_address?: string | null
               language?: string | null
               os?: string | null
               page_url: string
               referrer?: string | null
               screen_size?: string | null
               visit_date?: string
               visit_timestamp?: string
               visitor_id: string
            }
            Update: {
               browser?: string | null
               device_type?: string | null
               id?: number
               ip_address?: string | null
               language?: string | null
               os?: string | null
               page_url?: string
               referrer?: string | null
               screen_size?: string | null
               visit_date?: string
               visit_timestamp?: string
               visitor_id?: string
            }
            Relationships: []
         }
      }
      Views: {
         [_ in never]: never
      }
      Functions: {
         increment_view_count: {
            Args: { post_id: number }
            Returns: undefined
         }
         increment_visitor_count: {
            Args: { session_id_param: string }
            Returns: undefined
         }
         update_stats: {
            Args: Record<PropertyKey, never>
            Returns: undefined
         }
      }
      Enums: {
         [_ in never]: never
      }
      CompositeTypes: {
         [_ in never]: never
      }
   }
}

type DefaultSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
   DefaultSchemaTableNameOrOptions extends
      | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
      | { schema: keyof Database },
   TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof Database
   }
      ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
           Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
      : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
   ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
        Row: infer R
     }
      ? R
      : never
   : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
          DefaultSchema['Views'])
     ? (DefaultSchema['Tables'] &
          DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
          Row: infer R
       }
        ? R
        : never
     : never

export type TablesInsert<
   DefaultSchemaTableNameOrOptions extends
      | keyof DefaultSchema['Tables']
      | { schema: keyof Database },
   TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof Database
   }
      ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
      : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
   ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Insert: infer I
     }
      ? I
      : never
   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
     ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
          Insert: infer I
       }
        ? I
        : never
     : never

export type TablesUpdate<
   DefaultSchemaTableNameOrOptions extends
      | keyof DefaultSchema['Tables']
      | { schema: keyof Database },
   TableName extends DefaultSchemaTableNameOrOptions extends {
      schema: keyof Database
   }
      ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
      : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
   ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
        Update: infer U
     }
      ? U
      : never
   : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
     ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
          Update: infer U
       }
        ? U
        : never
     : never

export type Enums<
   DefaultSchemaEnumNameOrOptions extends
      | keyof DefaultSchema['Enums']
      | { schema: keyof Database },
   EnumName extends DefaultSchemaEnumNameOrOptions extends {
      schema: keyof Database
   }
      ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
      : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
   ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
   : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
     ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
     : never

export type CompositeTypes<
   PublicCompositeTypeNameOrOptions extends
      | keyof DefaultSchema['CompositeTypes']
      | { schema: keyof Database },
   CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
      schema: keyof Database
   }
      ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
      : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
   ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
   : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
     ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
     : never

export const Constants = {
   public: {
      Enums: {},
   },
} as const
