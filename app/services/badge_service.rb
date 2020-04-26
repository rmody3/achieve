module BadgeService
  extend self

  def performOnCreate(goal)
    student = goal.student
    
    if student.goals.count == 1
      Badge.create(student_id: student.id, kind: 'first_goal_created')
      return
    end

    if student.goals.count == 3
      Badge.create(student_id: student.id, kind: 'third_goal_created')
    end

    last_goals = student.goals.last(2)
    if (last_goals[1].created_at - last_goals[0].created_at)/(3600*24) <= 1.0
      unless Badge.find_by(student_id: student.id, kind: 'ambitious')
        Badge.create(student_id: student.id, kind: 'ambitious')
      end
    end
  end

  def performOnApprove(goal)
    student = goal.student

    if student.goals.count == 1
      Badge.create(student_id: student.id, kind: 'first_goal_approved')
    end

    if student.goals.count == 3
      Badge.create(student_id: student.id, kind: 'third_goal_approved')
    end
  end

  def get(student)
    student.badges.map do |b|
      badges[b.kind.to_sym]
    end 
  end
  
  private

  def badges
    Badge::TYPES
  end
end