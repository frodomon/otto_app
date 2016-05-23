require 'test_helper'

class UbigeosControllerTest < ActionController::TestCase
  setup do
    @ubigeo = ubigeos(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:ubigeos)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create ubigeo" do
    assert_difference('Ubigeo.count') do
      post :create, ubigeo: { name: @ubigeo.name, parent_id: @ubigeo.parent_id, ubigeo_id: @ubigeo.ubigeo_id }
    end

    assert_redirected_to ubigeo_path(assigns(:ubigeo))
  end

  test "should show ubigeo" do
    get :show, id: @ubigeo
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @ubigeo
    assert_response :success
  end

  test "should update ubigeo" do
    patch :update, id: @ubigeo, ubigeo: { name: @ubigeo.name, parent_id: @ubigeo.parent_id, ubigeo_id: @ubigeo.ubigeo_id }
    assert_redirected_to ubigeo_path(assigns(:ubigeo))
  end

  test "should destroy ubigeo" do
    assert_difference('Ubigeo.count', -1) do
      delete :destroy, id: @ubigeo
    end

    assert_redirected_to ubigeos_path
  end
end
