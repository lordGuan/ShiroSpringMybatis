package cn.dbsec.permission.bo;

import java.io.Serializable;

import cn.dbsec.common.model.URole;

public class URoleBo extends URole implements Serializable {
	private static final long serialVersionUID = 1L;
	/**
	 * 用户ID (用String， 考虑多个ID，现在只有一个ID)
	 */
	private String userId;
	/**
	 * 是否勾选
	 */
	private String marker;

	public boolean isCheck() {
		return org.apache.commons.lang.StringUtils.equals(userId, marker);
	}

	public String getMarker() {
		return marker;
	}

	public void setMarker(String marker) {
		this.marker = marker;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

}
