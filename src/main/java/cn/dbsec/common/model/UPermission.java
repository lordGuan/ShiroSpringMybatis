package cn.dbsec.common.model;

import java.io.Serializable;

import net.sf.json.JSONObject;

/**
 * <p>
 * 权限实体 区分　责任人　日期　　　　说明<br/>
 * 创建　　2016年5月25日 　<br/>
 * 
 * @author
 * @version 1.0,2016年5月25日 <br/>
 * 
 */
public class UPermission implements Serializable {
	private static final long serialVersionUID = 1L;
	private Long id;
	/** 操作的url */
	private String url;
	/** 操作的名称 */
	private String name;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Override
	public String toString() {
		return JSONObject.fromObject(this).toString();
	}
}