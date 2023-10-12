package com.result;

import java.util.HashMap;
import java.util.Map;

public class JsonResult {
    private boolean success;
    private String msg;
    private int code;
    private Map<String, Object> data = new HashMap<>();

    public int getCode() {
        return code;
    }

    public Map<String, Object> getData() {
        return data;
    }

    public void setData(Map<String, Object> data) {
        this.data = data;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }
    public void setJsonResult(boolean success, int code, String msg) {
        this.success = success;
        this.code = code;
        this.msg = msg;
    }
    //构造方法私有化
    private JsonResult() {
    }

    //成功静态方法
    public static JsonResult success() {
        JsonResult jsonResult = new JsonResult();
        jsonResult.setJsonResult(true, 200, "登录成功");
        return jsonResult;
    }

    //成功静态方法 自定义信息
    public static JsonResult success(String msg) {
        JsonResult success = JsonResult.success();
        success.setMsg(msg);
        return success;
    }

    //    失败的静态方法
    public static JsonResult fail() {
        JsonResult jsonResult = new JsonResult();
        jsonResult.setJsonResult(false,401,"登录失败");
        return jsonResult;
    }

    //    失败静态方法 自定义信息
    public static JsonResult fail(String msg) {
        JsonResult fail = JsonResult.fail();
        fail.setMsg(msg);
        return fail;
    }

    public JsonResult data(String key, Object value) {
        this.data.put(key, value);
        return this;
    }

    public JsonResult data(String key, Object value, String key2, Object value2) {
        this.data.put(key, value);
        this.data.put(key2, value2);
        return this;
    }

    public JsonResult data(Map<String, Object> map) {
        this.setData(map);
        return this;
    }

    @Override
    public String toString() {
        return "JsonResult{" +
                "success=" + success +
                ", msg='" + msg + '\'' +
                ", code=" + code +
                ", data=" + data +
                '}';
    }

}
