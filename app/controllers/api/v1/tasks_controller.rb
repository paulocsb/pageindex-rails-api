class Api::V1::TasksController < Api::V1::BaseController
  def index
  	pages = Page.all
    render json: pages, each_serializer: Api::V1::PageSerializer, root: false
  end

  def create_page
  	page = Page.new(task_params)
  	page.send(:url_accessible?)

  	if page.save
  		render json: page, serializer: Api::V1::PageSerializer
  	else
      raise ErrorService::RecordInvalidError.new(instance: page)
    end
  end

  private

	  def task_params
	  	params.require(:task).permit(:url)
	  end
end
