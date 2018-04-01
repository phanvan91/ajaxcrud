<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/','AjaxCrud@index');
Route::get('/task/{id}','AjaxCrud@task');

Route::post('/create','AjaxCrud@create');

Route::put('/update/{id}','AjaxCrud@update');

Route::get('/del/{id}','AjaxCrud@del');