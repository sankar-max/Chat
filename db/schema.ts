import { relations } from 'drizzle-orm'
import {
  pgTable,
  serial,
  text,
  varchar,
  boolean,
  timestamp,
  integer,
} from 'drizzle-orm/pg-core'

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Messages table
export const messages = pgTable('messages', {
  id: serial('id').primaryKey(),
  senderId: integer('sender_id')
    .references(() => users.id)
    .notNull(),
  receiverId: integer('receiver_id').references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
})

// Friends table
export const friends = pgTable('friends', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  friendId: integer('friend_id')
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
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdBy: integer('created_by')
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
  id: serial('id').primaryKey(),
  groupId: integer('group_id')
    .references(() => groups.id)
    .notNull(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
})

// Group Messages table
export const groupMessages = pgTable('group_messages', {
  id: serial('id').primaryKey(),
  groupId: integer('group_id')
    .references(() => groups.id)
    .notNull(),
  senderId: integer('sender_id')
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
  receiver: one(users, { fields: [messages.receiverId], references: [users.id] }),
}))


export const groupRelations = relations(groups, ({ many, one }) => ({
  createdBy: one(users, { fields: [groups.createdBy], references: [users.id] }),
  members: many(groupMembers),
  messages: many(groupMessages),
}))


export const groupMemberRelations = relations(groupMembers, ({ one }) => ({
  group: one(groups, { fields: [groupMembers.groupId], references: [groups.id] }),
  user: one(users, { fields: [groupMembers.userId], references: [users.id] }),
}))


export const groupMessageRelations = relations(groupMessages, ({ one }) => ({
  group: one(groups, { fields: [groupMessages.groupId], references: [groups.id] }),
  sender: one(users, { fields: [groupMessages.senderId], references: [users.id] }),
}))

