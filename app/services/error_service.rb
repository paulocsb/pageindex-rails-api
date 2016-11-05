module ErrorService
  def self.handle(error)
    ErrorService::MessageMapper.send(error.class.name.demodulize.underscore, error)
  end

  class ApplicationError < StandardError
    attr_reader :message, :instance, :klass

    def initialize(payload = {})
      @message = payload[:message]
      @instance = payload[:instance]
      @klass = payload[:klass]
    end

    def instance_errors
      if instance.present?
        messages = instance.errors.messages.reduce({}) do |result, (attribute, messages)|
          result[attribute] = messages.to_sentence
          result
        end.to_json
      end
    end
  end

  class RecordInvalidError < ApplicationError; end
  class RecordNotFoundError < ApplicationError; end
  class HTTPInvalidError < ApplicationError; end

  class MessageMapper
    attr_accessor :code, :message, :status

    def self.message_provider(key, interpolation_args = {})
      I18n.t "api.errors.#{key}", interpolation_args.delete_if { |k,v| v.nil? }
    end

    ErrorService::ApplicationError.descendants.each do |application_error_class|
      error_class = application_error_class.name.demodulize.underscore

      define_singleton_method error_class do |error|
        new message_provider("#{error_class}.code"),
            message_provider("#{error_class}.message",
              message: error.message,
              instance_errors: error.instance_errors,
              klass: error.klass),
            message_provider("#{error_class}.status")
      end
    end

    def self.server_error
      new message_provider("server_error.code"),
          message_provider("server_error.message"),
          message_provider("server_error.status")
    end

    def self.params_error(message)
      new message_provider("params_error.code"),
          message_provider("params_error.message", message: message),
          message_provider("params_error.status")
    end

    def self.not_found
      new message_provider("not_found_error.code"),
          message_provider("not_found_error.message"),
          message_provider("not_found_error.status")
    end

    def self.http_invalid
      new message_provider("http_invalid_error.code"),
          message_provider("http_invalid_error.message"),
          message_provider("http_invalid_error.status")
    end

    def initialize(code, message, status)
      @code = code
      @message = message
      @status = status.to_sym
    end
  end
end