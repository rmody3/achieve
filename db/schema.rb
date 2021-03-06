# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_26_062050) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "achieved_rewards", force: :cascade do |t|
    t.bigint "class_participant_id"
    t.bigint "reward_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["class_participant_id", "reward_id"], name: "index_achieved_rewards_on_class_participant_id_and_reward_id", unique: true
    t.index ["class_participant_id"], name: "index_achieved_rewards_on_class_participant_id"
    t.index ["reward_id"], name: "index_achieved_rewards_on_reward_id"
  end

  create_table "badges", force: :cascade do |t|
    t.bigint "student_id"
    t.string "kind"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["student_id"], name: "index_badges_on_student_id"
  end

  create_table "class_participants", force: :cascade do |t|
    t.bigint "classroom_id"
    t.bigint "student_id"
    t.index ["classroom_id"], name: "index_class_participants_on_classroom_id"
    t.index ["student_id"], name: "index_class_participants_on_student_id"
  end

  create_table "classrooms", force: :cascade do |t|
    t.bigint "teacher_id"
    t.string "name"
    t.string "join_code"
    t.boolean "archived", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["teacher_id"], name: "index_classrooms_on_teacher_id"
  end

  create_table "comments", force: :cascade do |t|
    t.string "author_type"
    t.bigint "author_id"
    t.bigint "goal_id"
    t.text "body"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_comments_on_author_type_and_author_id"
    t.index ["goal_id"], name: "index_comments_on_goal_id"
  end

  create_table "goals", force: :cascade do |t|
    t.bigint "class_participant_id"
    t.string "title", null: false
    t.text "description", null: false
    t.date "due_date"
    t.datetime "accomplished_date"
    t.datetime "approved_date"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "achievement_points"
    t.index ["class_participant_id"], name: "index_goals_on_class_participant_id"
    t.index ["due_date"], name: "index_goals_on_due_date"
  end

  create_table "rewards", force: :cascade do |t|
    t.bigint "classroom_id"
    t.text "description", null: false
    t.integer "achievement_points", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["classroom_id"], name: "index_rewards_on_classroom_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "points_total", default: 0
    t.integer "points_remaining", default: 0
    t.index ["email"], name: "index_students_on_email", unique: true
    t.index ["reset_password_token"], name: "index_students_on_reset_password_token", unique: true
  end

  create_table "teachers", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_teachers_on_email", unique: true
    t.index ["reset_password_token"], name: "index_teachers_on_reset_password_token", unique: true
  end

  add_foreign_key "class_participants", "classrooms"
  add_foreign_key "class_participants", "students"
  add_foreign_key "classrooms", "teachers"
  add_foreign_key "goals", "class_participants"
  add_foreign_key "rewards", "classrooms"
end
