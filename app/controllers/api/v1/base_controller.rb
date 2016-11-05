class Api::V1::BaseController < ApplicationController
  
  unless Rails.application.config.consider_all_requests_local
    rescue_from ActiveRecord::RecordNotFound,
                ActionController::RoutingError,
                ActionController::ParameterMissing,
                ActiveRecord::RecordInvalid,
                with: :respond_with_404
  end

  rescue_from(ActionController::ParameterMissing) do |parameter_missing_exception|
    message = "#{parameter_missing_exception.param}: parameter is required"
    error = ErrorService::MessageMapper.params_error(message)
    respond_to do |format|
      format.json { render json: error, serializer: Api::V1::ErrorSerializer, meta: { success: false }, status: 422 }
    end
  end

  rescue_from HTTParty::Error,
              Socket::SocketError,
              with: :respond_with_500

  rescue_from ErrorService::ApplicationError, with: :render_application_error

  protected

  def render_application_error(exception)
    render_error ErrorService.handle(exception)
  end

  def render_error(error)
    render json: error, serializer: Api::V1::ErrorSerializer, meta: { success: false }, status: error.status
  end

  def respond_with_404
    error = ErrorService::MessageMapper.not_found
    render json: error, serializer: Api::V1::ErrorSerializer, meta: { success: false }, status: 404
  end

  def respond_with_500(exception)
    error = ErrorService::MessageMapper.server_error
    render json: error, serializer: Api::V1::ErrorSerializer, meta: { success: false }, status: 500
  end
end