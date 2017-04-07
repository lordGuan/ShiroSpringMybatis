package cn.dbsec.common.model;

import java.io.Serializable;

import net.sf.json.JSONObject;

/**
 * <p>
 * 用户{@link UUser} 和角色 {@link URole} 中间表
 * <p>
 * 
 * 区分　责任人　日期　　　　说明<br/>
 * 创建　　2016年5月25日 　<br/>
 * 
 * @author
 * @version 1.0,2016年5月25日 <br/>
 * 
 */
public class UUserRole implements Serializable {
	private static final long serialVersionUID = 1L;
	/** {@link UUser.id} */
	private Long uid;
	/** {@link URole.id} */
	private Long rid;

	public UUserRole(Long uid, Long rid) {
		this.uid = uid;
		this.rid = rid;
	}

	public UUserRole() {
	}

	public Long getUid() {
		return uid;
	}

	public void setUid(Long uid) {
		this.uid = uid;
	}

	public Long getRid() {
		return rid;
	}

	public void setRid(Long rid) {
		this.rid = rid;
	}

	@Override
	public String toString() {
		return JSONObject.fromObject(this).toString();
	}
}