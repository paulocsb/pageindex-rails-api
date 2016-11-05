class Api::V1::ErrorSerializer < ActiveModel::Serializer
  attributes :error_code, :error_text

  def error_code
    if object.respond_to?(:each)
      object.map(&:code).uniq.join(',')
    else
      object.code
    end
  end

  def error_text
    if object.respond_to?(:each)
      object.map(&:message).uniq.join(',')
    else
      object.message
    end
  end
end