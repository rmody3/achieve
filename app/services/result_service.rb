module ResultService

  Result = Struct.new(:success , :data)

  def result(success, data)
    Result.new(success, data)
  end
end