package config

type Config struct {
	Runtime     RuntimeConfig            `mapstructure:"runtime"`
	ChannelsDir string                   `mapstructure:"channels_dir"`
	Destinations map[string]Destination  `mapstructure:"destinations"`
	Kafka       KafkaConfig              `mapstructure:"kafka"`
}

type RuntimeConfig struct {
	Name     string        `mapstructure:"name"`
	Profile  string        `mapstructure:"profile"`
	LogLevel string        `mapstructure:"log_level"`
	Storage  StorageConfig `mapstructure:"storage"`
}

type StorageConfig struct {
	Driver      string `mapstructure:"driver"`
	PostgresDSN string `mapstructure:"postgres_dsn"`
}

type KafkaConfig struct {
	Brokers  []string `mapstructure:"brokers"`
	ClientID string   `mapstructure:"client_id"`
}

// Destination defines a named output target (root-level or inline).
type Destination struct {
	Type  string          `mapstructure:"type"`
	Kafka *KafkaDestConfig `mapstructure:"kafka"`
	HTTP  *HTTPDestConfig  `mapstructure:"http"`
}

type KafkaDestConfig struct {
	Brokers []string `mapstructure:"brokers"`
	Topic   string  `mapstructure:"topic"`
}

type HTTPDestConfig struct {
	URL  string            `mapstructure:"url"`
	Auth *HTTPAuthConfig   `mapstructure:"auth"`
}

type HTTPAuthConfig struct {
	Type  string `mapstructure:"type"`
	Token string `mapstructure:"token"`
}
