import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
  uuid,
} from 'drizzle-orm/pg-core'

// Users table
export const users = pgTable('users', {
  id: varchar('id', { length: 255 }).primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  profileImage: text('profile_image'),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Messages table
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  senderId: varchar('sender_id', { length: 255 }) 
    .references(() => users.id)
    .notNull(),
  receiverId: varchar('receiver_id', { length: 255 }) 
    .references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Friends table
export const friends = pgTable('friends', {
  id: uuid('id').primaryKey().defaultRandom(),
  accepted: boolean('accepted').notNull().default(false),
  userId: varchar('user_id', { length: 255 }) 
    .references(() => users.id)
    .notNull(),
  friendId: varchar('friend_id', { length: 255 }) 
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Groups table
export const groups = pgTable('groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  createdBy: varchar('created_by', { length: 255 }) 
    .references(() => users.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Group Members table
export const groupMembers = pgTable('group_members', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id') 
    .references(() => groups.id)
    .notNull(),
  userId: varchar('user_id', { length: 255 }) 
    .references(() => users.id)
    .notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
})

// Group Messages table
export const groupMessages = pgTable('group_messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  groupId: uuid('group_id') 
    .references(() => groups.id)
    .notNull(),
  senderId: varchar('sender_id', { length: 255 }) 
    .references(() => users.id)
    .notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Relations
export const userRelations = relations(users, ({ many }) => ({
  messages: many(messages),
  friends: many(friends),
  createdGroups: many(groups),
  groupMemberships: many(groupMembers),
  sentGroupMessages: many(groupMessages),
}))

export const messageRelations = relations(messages, ({ one }) => ({
  sender: one(users, { fields: [messages.senderId], references: [users.id] }),
  receiver: one(users, {
    fields: [messages.receiverId],
    references: [users.id],
  }),
}))

export const groupRelations = relations(groups, ({ many, one }) => ({
  createdBy: one(users, { fields: [groups.createdBy], references: [users.id] }),
  members: many(groupMembers),
  messages: many(groupMessages),
}))

export const groupMemberRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, {
    fields: [groupMembers.groupId],
    references: [groups.id],
  }),
  user: one(users, { fields: [groupMembers.userId], references: [users.id] }),
}))

export const groupMessageRelations = relations(groupMessages, ({ one }) => ({
  group: one(groups, {
    fields: [groupMessages.groupId],
    references: [groups.id],
  }),
  sender: one(users, {
    fields: [groupMessages.senderId],
    references: [users.id],
  }),
}))
