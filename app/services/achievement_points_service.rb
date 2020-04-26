module AchievementPointsService
  extend self
  extend ResultService

  def add(student, points)
    student.points_total += points
    student.points_remaining += points
    if student.save
      result(true, student)
    else
      result(false, student.errors)
    end
  end
  
  def spend(student, points)
    if student.points_remaining >= points
      student.points_remaining -= points
      if student.save
        result(true, student)
      else
        result(false, student.errors)
      end
    else
      result(false, 'not enought points')
    end
  end
end