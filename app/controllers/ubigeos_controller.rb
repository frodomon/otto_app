class UbigeosController < ApplicationController
  before_action :set_ubigeo, only: [:show, :edit, :update, :destroy]

  respond_to :html

  def index
    @ubigeos = Ubigeo.all
    respond_with(@ubigeos)
  end

  def show
    respond_with(@ubigeo)
  end

  def new
    @ubigeo = Ubigeo.new
    respond_with(@ubigeo)
  end

  def edit
  end

  def create
    @ubigeo = Ubigeo.new(ubigeo_params)
    @ubigeo.save
    respond_with(@ubigeo)
  end

  def update
    @ubigeo.update(ubigeo_params)
    respond_with(@ubigeo)
  end

  def destroy
    @ubigeo.destroy
    respond_with(@ubigeo)
  end

  def get_departamentos
    @ws_ubigeo = Ubigeo.find_by_sql ["select ubigeo_id, name, parent_id from ubigeos where parent_id is null"]
    
    respond_to do |format|
        format.html
        format.json { render json: @ws_ubigeo }
    end
  end

  def get_provincias
    @ws_ubigeo = Ubigeo.where(parent_id: params[:departamento])

    respond_to do |format|
        format.html
        format.json { render json: @ws_ubigeo }
    end
  end

  def get_distritos
    @ws_ubigeo = Ubigeo.where(parent_id: params[:provincia])

    respond_to do |format|
        format.html
        format.json { render json: @ws_ubigeo }
    end
  end

  def get_ubigeo
    @ubigeo = Ubigeo.find(params[:ubigeo_id])

    respond_to do |format|
        format.html
        format.json { render json: @ubigeo }
    end
  end
  
  private
    def set_ubigeo
      @ubigeo = Ubigeo.find(params[:id])
    end

    def ubigeo_params
      params.require(:ubigeo).permit(:ubigeo_id, :name, :parent_id)
    end
end
