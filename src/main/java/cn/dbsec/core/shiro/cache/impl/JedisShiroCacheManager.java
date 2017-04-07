package cn.dbsec.core.shiro.cache.impl;

import org.apache.shiro.cache.Cache;

import cn.dbsec.core.shiro.cache.JedisManager;
import cn.dbsec.core.shiro.cache.JedisShiroCache;
import cn.dbsec.core.shiro.cache.ShiroCacheManager;

/**
 * <p>
 * JRedis管理
 * <p>
 * 创建　　2016年6月2日 　<br/>
 *
 * @author
 * @version 1.0,2016年6月2日 <br/>
 */
public class JedisShiroCacheManager implements ShiroCacheManager {

	private JedisManager jedisManager;

	@Override
	public <K, V> Cache<K, V> getCache(String name) {
		return new JedisShiroCache<K, V>(name, getJedisManager());
	}

	@Override
	public void destroy() {
		// 如果和其他系统，或者应用在一起就不能关闭
		// getJedisManager().getJedis().shutdown();
	}

	public JedisManager getJedisManager() {
		return jedisManager;
	}

	public void setJedisManager(JedisManager jedisManager) {
		this.jedisManager = jedisManager;
	}
}
