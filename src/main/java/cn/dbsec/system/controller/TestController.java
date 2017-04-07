package cn.dbsec.system.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.dbsec.common.controller.BaseController;
import cn.dbsec.core.shiro.token.manager.TokenManager;

@Controller
@Scope(value = "prototype")
@RequestMapping("test")
public class TestController extends BaseController {
	protected Map<String, Object> resultMap = new LinkedHashMap<String, Object>();

	@RequestMapping(value = "test")
	public ModelAndView test() {
		return new ModelAndView("system/test", "users", TokenManager.getToken());
	}

	@RequestMapping(value = "test", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> test(String value) {
		System.out.println(value);
		resultMap.put("users", TokenManager.getToken());
		resultMap.put("status", 200);
		resultMap.put("message", "提交成功!");
		return resultMap;
	}
}
